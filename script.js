// ==========================================
// 1. Import Firebase v9 (Modular)
// ==========================================
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { serverTimestamp, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, deleteDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyCndWFEXXbbe6GF__SLTh9FjQ2VZNnk7Bg",
  authDomain: "animeluxe-9d719.firebaseapp.com",
  projectId: "animeluxe-9d719",
  storageBucket: "animeluxe-9d719.firebasestorage.app",
  messagingSenderId: "192136877400",
  appId: "1:192136877400:web:908f9e7e15fa9229f2012d",
  measurementId: "G-L4036GS9GY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let isLoginMode = true;

// ==========================================
// 2. Scurity
// ==========================================
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if (e.keyCode == 123 || 
       (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || 
       (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || 
       (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        window.location.href = "https://www.google.com";
        return false;
    }
};

setInterval(function() {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();
    if (endTime - startTime > 100) {
        window.location.href = "https://www.google.com";
    }
}, 1000);

document.body.classList.add('loading');
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
});

// ==========================================
// 3. Varibles Global
// ==========================================
let animeList = [];
let currentAnimeData = null;
let currentEpisodeData = null;

let homeAllAnime = [];
let homeVisibleCount = 18;
let genreFilteredAnime = [];
let genreVisibleCount = 18;
let currentSlide = 0;
let userBookmarks = [];

// ==========================================
// 4. Routing and Data
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        animeList = await response.json();
        
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');
        const id = urlParams.get('id');
        const ep = urlParams.get('ep');
        const searchQuery = urlParams.get('search');
        const playId = urlParams.get('play');
        const genreQuery = urlParams.get('genre');

        if (document.getElementById('app-content')) {
            if (page === 'player' && id) {
                const targetEp = ep ? parseInt(ep) : 1; 
                loadPlayer(id, targetEp); 
            } else if (playId) {
                loadPlayer(playId, 1);
            } else if (searchQuery) {
                document.getElementById('searchInput').value = searchQuery;
                executeSearch(searchQuery);
            } else if (page === 'bookmarks') { 
                setTimeout(() => { loadBookmarksPage(); }, 500);
            } else {
                loadHome();
            }
        } else if (document.getElementById('genres-content')) {
            generateGenresPage();
            if (genreQuery) {
                filterByGenreOnPage(genreQuery);
            } else {
                filterByGenreOnPage('All'); 
            }
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

// ==========================================
// 5. Auth & Firebase Functions system
// ==========================================
onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const navBookmark = document.getElementById('nav-bookmark');

    if (user) {
        if(authButtons) authButtons.style.display = 'none';
        if(userProfile) userProfile.style.display = 'flex';
        const userEmailElem = document.getElementById('user-email');
        if(userEmailElem) userEmailElem.innerText = user.email.split('@')[0];
        if(navBookmark) navBookmark.style.display = 'block';

        try {
            const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
            const snapshot = await getDocs(bookmarksRef);
            userBookmarks = snapshot.docs.map(doc => doc.data().animeId);
            updateAllBookmarkIcons();
            
            if(document.getElementById('history-section')) {
                renderContinueWatching(); 
            }

        } catch(e) { console.error("Load Bookmarks Error", e); }

    } else {
        if(authButtons) authButtons.style.display = 'flex';
        if(userProfile) userProfile.style.display = 'none';
        if(navBookmark) navBookmark.style.display = 'none';
        userBookmarks = [];
        updateAllBookmarkIcons();

        const historySec = document.getElementById('history-section');
        if(historySec) historySec.style.display = 'none';
    }
});

function updateAllBookmarkIcons() {
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        const animeId = btn.getAttribute('data-anime-id');
        const icon = btn.querySelector('i');
        if (!icon || !animeId) return;
        
        if (userBookmarks.includes(animeId)) {
            icon.className = 'fa-solid fa-bookmark';
            icon.style.color = 'var(--accent)';
        } else {
            icon.className = 'fa-regular fa-bookmark';
            icon.style.color = '';
        }
    });
}

let authMode = 'login';
function openAuthModal(mode) {
    authMode = mode; 
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('auth-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const switchText = document.getElementById('auth-switch-text');
    const passInput = document.getElementById('auth-password');
    const forgotLink = document.getElementById('forgot-pass-container');

    modal.style.display = 'flex';

    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';

    if (mode === 'login') {
        title.innerText = 'Login';
        passInput.style.display = 'block';
        passInput.required = true;
        forgotLink.style.display = 'block'; 
        submitBtn.innerText = 'Login';
        submitBtn.classList.remove('reset-mode'); 
        switchText.innerHTML = 'Don\'t have an account? <span onclick="openAuthModal(\'signup\')">Sign Up</span>';
        
    } else if (mode === 'signup') {
        title.innerText = 'Sign Up';
        passInput.style.display = 'block';
        passInput.required = true;
        forgotLink.style.display = 'none'
        submitBtn.innerText = 'Sign Up';
        submitBtn.classList.remove('reset-mode');
        switchText.innerHTML = 'Already have an account? <span onclick="openAuthModal(\'login\')">Login</span>';
        
    } else if (mode === 'reset') {
        title.innerText = 'Reset Password';
        passInput.style.display = 'none'; 
        passInput.required = false; 
        forgotLink.style.display = 'none';
        submitBtn.innerText = 'Send Reset Link';
        submitBtn.classList.add('reset-mode'); 
        switchText.innerHTML = 'Remember password? <span onclick="openAuthModal(\'login\')">Login</span>';
    }
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('auth-form').reset();
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    updateAuthUI();
}

function updateAuthUI() {
    document.getElementById('auth-title').innerText = isLoginMode ? 'Login' : 'Sign Up';
    document.getElementById('auth-submit-btn').innerText = isLoginMode ? 'Login' : 'Create Account';
    document.getElementById('auth-switch-text').innerHTML = isLoginMode 
        ? "Don't have an account? <span>Sign Up</span>" 
        : "Already have an account? <span>Login</span>";
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const submitBtn = document.getElementById('auth-submit-btn');
    
    // Loading
    const originalText = submitBtn.innerText;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
        if (authMode === 'login') {
            await signInWithEmailAndPassword(auth, email, password);
            showNotification("Login successful!", "success"); 
            closeAuthModal();
        } else if (authMode === 'signup') {
            await createUserWithEmailAndPassword(auth, email, password);
            showNotification("Account created successfully!", "success");
            closeAuthModal();
        } else if (authMode === 'reset') {
            if (!email) {
                throw { code: 'no-email' }; 
            }
            await sendPasswordResetEmail(auth, email);
            showNotification("Reset link sent! Please check your email.", "success");
            openAuthModal('login');
        }
    } catch (error) {
        console.error("Firebase Auth Error:", error); 
        
        let errorMsg = "Something went wrong. Please try again.";
        
        if(error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') errorMsg = "Invalid email or password.";
        if(error.code === 'auth/email-already-in-use') errorMsg = "This email is already in use.";
        if(error.code === 'auth/weak-password') errorMsg = "Password should be at least 6 characters.";
        if(error.code === 'auth/missing-email' || error.code === 'no-email') errorMsg = "Please enter your email address.";
        if(error.code === 'auth/invalid-email') errorMsg = "Invalid email format.";
        
        showNotification(errorMsg, "error");
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Logout Error", error);
    }
}
async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    
    if (!email) {
        showNotification("Please enter your email address", "error");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        showNotification("Password reset email sent! Please check your inbox.", "success");
    } catch (error) {
        showNotification("Email not found in our system or an error occurred", "error");
    }
}
// ==========================================
// 6.Bookmarks system
// ==========================================
async function handleBookmark(event, animeId) {
    event.stopPropagation();
    
    if (!currentUser) {
        openAuthModal('login');
        return;
    }

    const button = event.currentTarget;
    const icon = button ? button.querySelector('i') : null;

    if (button.disabled) return;

    let isCurrentlyBookmarked = false;
    
    if (icon) {
        isCurrentlyBookmarked = icon.classList.contains('fa-solid') && !icon.classList.contains('fa-spinner');

        icon.className = 'fa-solid fa-spinner fa-spin';
        icon.style.color = '#888'; 

        button.disabled = true;
        button.style.pointerEvents = 'none';
    }

    try {
        const bookmarkRef = doc(db, 'users', currentUser.uid, 'bookmarks', animeId);
        const docSnap = await getDoc(bookmarkRef);

        if (docSnap.exists()) {
            await deleteDoc(bookmarkRef);
            userBookmarks = userBookmarks.filter(id => id !== animeId);
            if (icon) {
                icon.className = 'fa-regular fa-bookmark';
                icon.style.color = '';
            }
        } else {
            await setDoc(bookmarkRef, { animeId: animeId, addedAt: new Date() });
            if (!userBookmarks.includes(animeId)) userBookmarks.push(animeId);
            if (icon) {
                icon.className = 'fa-solid fa-bookmark';
                icon.style.color = 'var(--accent)'; 
            }
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);

        if (icon) {
            icon.className = isCurrentlyBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
            icon.style.color = isCurrentlyBookmarked ? 'var(--accent)' : '';
        }
        alert("Something went wrong while updating your bookmarks. Please try again.");
        
    } finally {
        if (button) {
            button.disabled = false;
            button.style.pointerEvents = 'auto';
        }
    }
}

async function loadBookmarksPage() {
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    showLoading();
    const app = document.getElementById('app-content');
    try {
        const bookmarksRef = collection(db, 'users', currentUser.uid, 'bookmarks');
        const snapshot = await getDocs(bookmarksRef);
        const bookmarkedIds = [];
        snapshot.forEach(doc => { bookmarkedIds.push(doc.data().animeId); });
        
        const bookmarkedAnime = animeList.filter(anime => bookmarkedIds.includes(anime.id));
        app.innerHTML = `
            <div style="padding-top: 20px;">
                <h2 class="section-title"><i class="fa-solid fa-bookmark"></i> My Bookmarks</h2>
                ${generateGridHTML(bookmarkedAnime)}
            </div>
        `;
        setTimeout(() => {
            document.querySelectorAll('.bookmark-btn i').forEach(icon => {
                icon.classList.replace('fa-regular', 'fa-solid');
                icon.style.color = 'var(--accent)';
            });
            hideLoading();
        }, 300);
    } catch (error) {
        console.error("Error loading bookmarks:", error);
        hideLoading();
    }
}

// ==========================================
// 7. help function & UI
// ==========================================
function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if(overlay) { overlay.style.display = 'flex'; updateProgress(0); }
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if(overlay) overlay.style.display = 'none';
}

function updateProgress(percentage) {
    const barFill = document.querySelector('.progress-bar-fill');
    const text = document.querySelector('.progress-text');
    if(barFill) barFill.style.width = percentage + '%';
    if(text) text.innerText = percentage + '% complete';
}

function waitForImages(container, callback) {
    const images = container.querySelectorAll('img');
    const totalImages = images.length;
    let loadedImages = 0;
    if (totalImages === 0) { callback(); return; }
    images.forEach(img => {
        img.onload = img.onerror = () => {
            loadedImages++;
            updateProgress(Math.round((loadedImages / totalImages) * 100));
            if (loadedImages === totalImages) callback();
        };
    });
}

function goToPlayer(animeId, epNum = 1) {
    window.location.href = `index.html?page=player&id=${animeId}&ep=${epNum}`;
}

function generateGridHTML(list) {
    let html = `<div class="anime-grid">`;
    if(list.length === 0) {
        html += `<p style="padding: 0 50px; color: var(--text-muted);">No anime found.</p>`;
    } else {
        list.forEach(anime => {
            const quality = anime.quality || 'HD'; 

            const isBookmarked = typeof userBookmarks !== 'undefined' && userBookmarks.includes(anime.id);
            const iconClass = isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
            const iconColor = isBookmarked ? 'color: var(--accent);' : '';

            html += `
                <div class="anime-card" onclick="goToPlayer('${anime.id}')">
                    <div class="anime-img-wrapper">
                        <div class="quality-badge">${quality}</div>
                        <img src="${anime.image}" alt="${anime.title}" class="anime-img">
                        <button class="bookmark-btn" data-anime-id="${anime.id}" onclick="handleBookmark(event, '${anime.id}')" title="Add to Bookmark">
                            <i class="${iconClass}" style="${iconColor}"></i>
                        </button>
                        <div class="anime-actions">
                            <button class="action-btn preview-btn" onclick="openPreview('${anime.id}', event)" title="Preview">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="anime-info">
                        <h3>${anime.title}</h3>
                        <span>${anime.genres ? anime.genres.join(', ') : ''}</span>
                    </div>
                </div>
            `;
        });
    }
    html += `</div>`;
    return html;
}

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function moveSlide(direction) {
    const slidesContainer = document.getElementById('banner-slides');
    if (!slidesContainer) return;
    const totalSlides = 3; 
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// ==========================================
// 8. Home & Genres
// ==========================================
function loadHome() {
    showLoading();
    const app = document.getElementById('app-content');
    if(!app || animeList.length === 0) { hideLoading(); return; }

    const bannerAnimes = shuffleArray(animeList).slice(0, 3);
    let slidesHtml = '';
    bannerAnimes.forEach(anime => {
        slidesHtml += `
            <div class="banner-slide" style="background-image: url('${anime.banner || anime.image}');">
                <div class="banner-gradient"></div>
                <div class="banner-clean-content">
                    <h1 class="banner-title">${anime.title}</h1>
                    <p class="banner-synopsis">${anime.synopsis || 'No synopsis available.'}</p>
                    <button class="btn-watch-now" onclick="goToPlayer('${anime.id}')">
                        <i class="fa-solid fa-play"></i> Watch Now
                    </button>
                </div>
            </div>
        `;
    });

    const latestUpdates = [...animeList].reverse().slice(0, 6);
    homeAllAnime = shuffleArray(animeList);
    homeVisibleCount = 18;
    const initialAllAnime = homeAllAnime.slice(0, homeVisibleCount);

    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = `
        <div class="banner-carousel">
            <div class="banner-slides" id="banner-slides">
                ${slidesHtml}
            </div>
            <button class="slider-btn slider-prev" onclick="moveSlide(-1)"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="slider-btn slider-next" onclick="moveSlide(1)"><i class="fa-solid fa-chevron-right"></i></button>
        </div>

        <div id="history-section" style="display: none;"></div>

        <h2 class="section-title">Latest Updates</h2>
        ${generateGridHTML(latestUpdates)}

        <h2 class="section-title" style="margin-top: 40px;">Explore Anime</h2>
        <div id="home-all-anime-container">
            ${generateGridHTML(initialAllAnime)}
        </div>
        ${homeAllAnime.length > homeVisibleCount ? `<button id="btn-load-more-home" class="load-more-btn" onclick="loadMoreHome()">Load More</button>` : ''}
    `;

    waitForImages(tempContainer, () => {
        app.innerHTML = tempContainer.innerHTML;
        window.scrollTo(0, 0);
        currentSlide = 0;
        setTimeout(() => {
            hideLoading();
            renderContinueWatching(); 
        }, 300);
    });
}

function loadMoreHome() {
    homeVisibleCount += 18;
    const container = document.getElementById('home-all-anime-container');
    const btn = document.getElementById('btn-load-more-home');
    container.innerHTML = generateGridHTML(homeAllAnime.slice(0, homeVisibleCount));
    if (homeVisibleCount >= homeAllAnime.length && btn) btn.style.display = 'none';
}

function generateGenresPage() {
    const genresSet = new Set();
    animeList.forEach(anime => {
        if(anime.genres) anime.genres.forEach(g => genresSet.add(g));
    });

    const container = document.getElementById('genres-tags-container');
    if(!container) return;

    let html = `<div class="genre-tag" id="tag-All" onclick="filterByGenreOnPage('All')">All Anime</div>`;
    genresSet.forEach(genre => {
        html += `<div class="genre-tag" id="tag-${genre}" onclick="filterByGenreOnPage('${genre}')">${genre}</div>`;
    });
    container.innerHTML = html;
}

function filterByGenreOnPage(genre) {
    const url = new URL(window.location);
    url.searchParams.set('genre', genre);
    window.history.pushState({}, '', url);

    document.querySelectorAll('.genre-tag').forEach(tag => tag.classList.remove('active'));
    const activeTag = document.getElementById(`tag-${genre}`);
    if(activeTag) activeTag.classList.add('active');

    let filtered = animeList;
    if(genre !== 'All') {
        filtered = animeList.filter(anime => anime.genres && anime.genres.includes(genre));
    }

    genreFilteredAnime = filtered;
    genreVisibleCount = 18;
    const initialRender = genreFilteredAnime.slice(0, genreVisibleCount);

    const resultsContainer = document.getElementById('genres-results');
    resultsContainer.innerHTML = `
        <h2 class="section-title" style="font-size:1.2rem; color:var(--text-muted);">Showing: ${genre} (${genreFilteredAnime.length} titles)</h2>
        <div id="genre-grid-container">
            ${generateGridHTML(initialRender)}
        </div>
        ${genreFilteredAnime.length > genreVisibleCount ? `<button id="btn-load-more-genre" class="load-more-btn" onclick="loadMoreGenre()">Load More</button>` : ''}
    `;
}

function loadMoreGenre() {
    genreVisibleCount += 18;
    const container = document.getElementById('genre-grid-container');
    const btn = document.getElementById('btn-load-more-genre');
    container.innerHTML = generateGridHTML(genreFilteredAnime.slice(0, genreVisibleCount));
    if (genreVisibleCount >= genreFilteredAnime.length && btn) btn.style.display = 'none';
}



// ==========================================
// 9. Search & Player
// ==========================================
function checkSearchEnter(event) {
    if (event.key === "Enter") {
        const query = document.getElementById('searchInput').value.trim();
        if(query === '') return;
        if (document.getElementById('app-content')) {
            executeSearch(query);
            window.history.pushState({}, '', `?search=${query}`);
        } else {
            window.location.href = `index.html?search=${query}`;
        }
    }
}

function executeSearch(query) {
    const q = query.toLowerCase();
    const filtered = animeList.filter(anime => {
        const matchTitle = anime.title.toLowerCase().includes(q);
        let matchKeyword = false;
        if(anime.search_keywords) {
            matchKeyword = anime.search_keywords.some(kw => kw.toLowerCase().includes(q));
        }
        return matchTitle || matchKeyword;
    });
    
    const app = document.getElementById('app-content');
    app.innerHTML = `
        <div style="padding-top: 20px;">
            <button class="back-btn" style="position:relative; left:50px; margin-bottom:20px;" onclick="window.location.href='index.html'">&lt; Back to Home</button>
            <h2 class="section-title">Search Results for "${query}"</h2>
            ${generateGridHTML(filtered)}
        </div>
    `;
}

function loadPlayer(animeId, epNum = 1) {
    showLoading();
    const anime = animeList.find(a => String(a.id) === String(animeId));
    if(!anime || !anime.episodes || anime.episodes.length === 0) { 
        hideLoading(); 
        loadHome(); 
        return; 
    }

    currentAnimeData = anime;
    currentEpisodeData = anime.episodes.find(e => String(e.ep_num) === String(epNum)) || anime.episodes[0];
    saveWatchHistory(anime.id, currentEpisodeData.ep_num);
    saveWatchHistory(anime.id, currentEpisodeData.ep_num);
    
    const app = document.getElementById('app-content');
    const tempContainer = document.createElement('div');

    let episodesHtml = '';
    anime.episodes.forEach(ep => {
        const isActive = ep.ep_num === currentEpisodeData.ep_num ? 'active' : '';
        episodesHtml += `
            <button id="btn-ep-${ep.ep_num}" class="ep-btn ${isActive}" onclick="switchEpisode(${ep.ep_num})">
                <i class="fa-solid fa-play"></i> ${ep.title}
            </button>
        `;
    });

    let serversHtml = '';
    if(currentEpisodeData.servers && currentEpisodeData.servers.length > 0) {
        currentEpisodeData.servers.forEach((srv, index) => {
            const isActive = index === 0 ? 'active' : ''; 
            serversHtml += `
                <button class="server-btn ${isActive}" onclick="switchServer(${index})">
                    ${srv.name}
                </button>`;
        });
    }

    const initialVideo = (currentEpisodeData.servers && currentEpisodeData.servers.length > 0) 
                         ? currentEpisodeData.servers[0].video_url 
                         : (currentEpisodeData.video_url || "");

    tempContainer.innerHTML = `
        <div class="player-header">
            <button class="back-btn" onclick="window.location.href='index.html'">
                <i class="fa-solid fa-chevron-left"></i> Back
            </button>
            <h1 class="player-title">${anime.title}</h1>
        </div>
        <div class="player-layout">
            <div class="video-section">
                <div class="server-selection">
                    <span><i class="fa-solid fa-satellite-dish"></i> Servers:</span>
                    <div class="server-btn-group" id="server-btn-group">
                        ${serversHtml}
                    </div>
                </div>

                <div class="video-wrapper">
                    <div id="video-player-loader" class="video-loading-overlay">
                        <div class="spinner"></div>
                        <p>LOADING VIDEO...</p>
                    </div>
                    <iframe id="anime-video" src="${initialVideo}" frameborder="0" allowfullscreen style="width: 100%; aspect-ratio: 16/9; border-radius: 8px;"></iframe>
                </div>

                <div class="video-info-bar">
                    <div class="video-info-text">
                        <h2 id="current-ep-title">${currentEpisodeData.title}</h2>
                        <span class="video-status" id="video-status-text">Now Playing from Server 1</span>
                    </div>
                    <button class="btn-secondary" onclick="resetVideo()"><i class="fa-solid fa-rotate-right"></i> Reload Server</button>
                </div>
            </div>
            <div class="episode-section">
                <div class="ep-header">
                    <h3><i class="fa-solid fa-list-ul"></i> Episodes</h3>
                </div>
                ${episodesHtml}
            </div>
        </div>
    `;

    waitForImages(tempContainer, () => {
        app.innerHTML = tempContainer.innerHTML;
        window.scrollTo(0, 0); 
        setTimeout(hideLoading, 300);
    });
    renderPlayerUI();
    hideLoading();
}

function switchEpisode(epNum) {
    if(!currentAnimeData) return;
    currentEpisodeData = currentAnimeData.episodes.find(e => String(e.ep_num) === String(epNum));
    if(!currentEpisodeData) return;
    saveWatchHistory(currentAnimeData.id, currentEpisodeData.ep_num);

    const iframe = document.getElementById('anime-video');
    const videoLoader = document.getElementById('video-player-loader');
    if(videoLoader) videoLoader.style.display = 'flex';

    iframe.onload = function() {
        if(videoLoader) videoLoader.style.display = 'none';
    };

    const newVideoUrl = (currentEpisodeData.servers && currentEpisodeData.servers.length > 0) 
                 ? currentEpisodeData.servers[0].video_url 
                 : (currentEpisodeData.video_url || "");
    
    iframe.src = newVideoUrl;

    document.getElementById('video-status-text').innerText = 'Now Playing from Server 1';
    document.getElementById('current-ep-title').innerText = currentEpisodeData.title;

    let serversHtml = '';
    if(currentEpisodeData.servers && currentEpisodeData.servers.length > 0) {
        currentEpisodeData.servers.forEach((srv, index) => {
            const isActive = index === 0 ? 'active' : ''; 
            serversHtml += `<button class="server-btn ${isActive}" onclick="switchServer(${index})">${srv.name}</button>`;
        });
    }
    document.getElementById('server-btn-group').innerHTML = serversHtml;

    document.querySelectorAll('.ep-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-ep-${epNum}`);
    if(activeBtn) activeBtn.classList.add('active');
}

function switchServer(serverIndex) {
    if(!currentEpisodeData || !currentEpisodeData.servers) return;
    const server = currentEpisodeData.servers[serverIndex];
    const iframe = document.getElementById('anime-video');
    const videoLoader = document.getElementById('video-player-loader');

    if(videoLoader) videoLoader.style.display = 'flex';
    iframe.onload = function() {
        if(videoLoader) videoLoader.style.display = 'none';
    };
    iframe.src = server.video_url;

    const buttons = document.querySelectorAll('.server-btn');
    buttons.forEach((btn, idx) => {
        if(idx === serverIndex) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    document.getElementById('video-status-text').innerText = `Now Playing from ${server.name}`;
}

function resetVideo() {
    const iframeElement = document.getElementById('anime-video');
    if(iframeElement) {
        const currentSrc = iframeElement.src;
        iframeElement.src = '';
        setTimeout(() => { iframeElement.src = currentSrc; }, 100);
    }
}

// ==========================================
// Continue Watching (History)
// ==========================================
async function saveWatchHistory(animeId, epNum) {
    const getLoggedInUser = () => {
        return new Promise((resolve) => {
            if (currentUser) return resolve(currentUser);
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    };

    const user = await getLoggedInUser();
    if (!user) return; 

    try {
        const historyRef = doc(db, 'users', user.uid, 'history', String(animeId));
        await setDoc(historyRef, {
            animeId: String(animeId),
            epNum: parseInt(epNum),
            timestamp: serverTimestamp()
        });
        console.log(`Saved: Anime ${animeId} Ep ${epNum}`);
    } catch (error) {
        console.error("Error saving history:", error);
    }
}

async function renderContinueWatching() {
    const container = document.getElementById('history-section');
    if (!container) return;

    if (!currentUser) {
        container.style.display = 'none';
        return;
    }

    try {
        const historyRef = collection(db, 'users', currentUser.uid, 'history');
        const q = query(historyRef, orderBy('timestamp', 'desc'), limit(4)); 
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            container.style.display = 'none';
            return;
        }

        let html = `<h2 class="section-title"><i class="fa-solid fa-clock-rotate-left" style="color: var(--accent);"></i> History</h2>
                    <div class="history-grid">`;

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const anime = animeList.find(a => a.id === data.animeId);
            
            if (anime) {
                const imgUrl = anime.banner || anime.image; 
                const epTitle = anime.episodes.find(e => e.ep_num === data.epNum)?.title || `Episode ${data.epNum}`;

                html += `
                    <div class="history-card" onclick="goToPlayer('${anime.id}', ${data.epNum})">
                        <div class="history-img-wrapper">
                            <img src="${imgUrl}" class="history-img" alt="${anime.title}">
                            <div class="history-ep-badge"><i class="fa-solid fa-play"></i> ${epTitle}</div>
                        </div>
                        <div class="history-info">
                            <h3>${anime.title}</h3>
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </div>
                `;
            }
        });
        html += `</div>`;
        
        container.innerHTML = html;
        container.style.display = 'block';

    } catch (error) {
        console.error("Error loading history:", error);
    }
}

// ==========================================
// 10.help function & UI
// ==========================================

function showNotification(message, type = 'success') {
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.innerHTML = `
            .toast-container {
                position: fixed; bottom: 20px; right: 20px; z-index: 9999;
                display: flex; flex-direction: column; gap: 10px;
            }
            .toast-msg {
                background: #222; color: #fff; padding: 15px 20px; border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                display: flex; align-items: center; gap: 12px; font-family: sans-serif;
                transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.35);
            }
            .toast-msg.show { transform: translateX(0); }
            .toast-msg.success { border-left: 4px solid #4caf50; }
            .toast-msg.error { border-left: 4px solid #f44336; }
        `;
        document.head.appendChild(style);
    }

    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check" style="color: #4caf50; font-size: 1.2rem;"></i>' : '<i class="fa-solid fa-circle-exclamation" style="color: #f44336; font-size: 1.2rem;"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function openPreview(animeId, event) {
    if (event) event.stopPropagation();

    const anime = animeList.find(a => String(a.id) === String(animeId));
  
    if (!anime || !anime.preview || anime.preview.trim() === "") {
        showNotification('No Trailer found for this anime', 'error'); 
        return; 
    }

    const modal = document.getElementById('preview-modal');
    const container = document.getElementById('preview-container');

    let iframeHTML = anime.preview;
    if (!iframeHTML.includes('<iframe')) {
        iframeHTML = `<iframe src="${anime.preview}" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    }

    container.innerHTML = iframeHTML;
    modal.style.display = 'flex'; 
}

function closePreview() {
    const modal = document.getElementById('preview-modal');
    const container = document.getElementById('preview-container');
    modal.style.display = 'none';
    container.innerHTML = '';
}

// ==========================================
// 11. Bug Fixes <script type="module">
// ==========================================

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.toggleAuthMode = toggleAuthMode;
window.handleAuthSubmit = handleAuthSubmit;
window.handleLogout = handleLogout;
window.handleBookmark = handleBookmark;
window.checkSearchEnter = checkSearchEnter;
window.goToPlayer = goToPlayer;
window.moveSlide = moveSlide;
window.loadMoreHome = loadMoreHome;
window.filterByGenreOnPage = filterByGenreOnPage;
window.loadMoreGenre = loadMoreGenre;
window.switchEpisode = switchEpisode;
window.switchServer = switchServer;
window.resetVideo = resetVideo;
window.showNotification = showNotification;
window.handleForgotPassword = handleForgotPassword;
window.openPreview = openPreview;
window.closePreview = closePreview;