// ==========================================
// 1. นำเข้า Firebase v9 (Modular)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, deleteDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Config ของคุณ
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
// 2. ระบบป้องกันและโหลดเบื้องต้น
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
// 3. ตัวแปรจัดการเนื้อหา
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
// 4. ระบบ Routing และ โหลด Data
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        animeList = await response.json();
        
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');
        const searchQuery = urlParams.get('search');
        const playId = urlParams.get('play');
        const genreQuery = urlParams.get('genre');

        if (document.getElementById('app-content')) {
            if (playId) {
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
// 5. ระบบ Auth & Firebase Functions
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

        // 🌟 ดึงข้อมูล Bookmark ของ User มาเก็บไว้
        try {
            const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
            const snapshot = await getDocs(bookmarksRef);
            userBookmarks = snapshot.docs.map(doc => doc.data().animeId);
            updateAllBookmarkIcons(); // อัปเดตไอคอนบนหน้าเว็บทันที
        } catch(e) { console.error("Load Bookmarks Error", e); }

    } else {
        if(authButtons) authButtons.style.display = 'flex';
        if(userProfile) userProfile.style.display = 'none';
        if(navBookmark) navBookmark.style.display = 'none';
        userBookmarks = []; // ล้างข้อมูลถ้าไม่ได้ล็อคอิน
        updateAllBookmarkIcons();
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

function openAuthModal(mode) {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'flex';
    isLoginMode = (mode === 'login');
    updateAuthUI();
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
    const originalText = submitBtn.innerText; // จำข้อความเดิมไว้ (Login หรือ Create Account)
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.style.cursor = 'not-allowed';
    try {
        if (isLoginMode) {
            await signInWithEmailAndPassword(auth, email, password);
            showNotification("Login successful!", "success"); // 🌟 ใช้แจ้งเตือนแทน alert
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            showNotification("Account created successfully!", "success"); // 🌟 ใช้แจ้งเตือนแทน alert
        }
        closeAuthModal();
    } catch (error) {
        // 🌟 ดัก Error ให้เป็นภาษาไทยอ่านง่ายๆ (ถ้ามี) หรือแสดงข้อความ Error ของ Firebase
        let errorMsg = "Something went wrong. Please try again.";
        if(error.code === 'auth/invalid-credential') errorMsg = "Email or password is incorrect";
        if(error.code === 'auth/email-already-in-use') errorMsg = "Email is already in use";
        if(error.code === 'auth/weak-password') errorMsg = "Password must be at least 6 characters";
        showNotification(errorMsg, "error"); // 🌟 ใช้แจ้งเตือนแทน alert
    } finally {
        // 🌟 2. คืนค่าปุ่มให้กลับมาเป็นเหมือนเดิม ไม่ว่าจะสำเร็จหรือพัง
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer'
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

// ==========================================
// 6. ระบบ Bookmarks
// ==========================================
// ==========================================
// 6. ระบบ Bookmarks
// ==========================================
async function handleBookmark(event, animeId) {
    event.stopPropagation();
    
    if (!currentUser) {
        openAuthModal('login');
        return;
    }

    const button = event.currentTarget;
    const icon = button ? button.querySelector('i') : null;

    // 1. ถ้าปุ่มกำลังโหลดอยู่ (โดนล็อค) ให้ข้ามไปเลย ป้องกันการกดเบิ้ล
    if (button.disabled) return;

    // 2. เช็คสถานะเดิมก่อน เผื่อเน็ตหลุดจะได้สลับกลับมาถูก
    let isCurrentlyBookmarked = false;
    
    if (icon) {
        isCurrentlyBookmarked = icon.classList.contains('fa-solid') && !icon.classList.contains('fa-spinner');
        
        // 3. เปลี่ยนไอคอนเป็นตัวโหลดแบบหมุนๆ (fa-spinner fa-spin)
        icon.className = 'fa-solid fa-spinner fa-spin';
        icon.style.color = '#888'; // สีเทาๆ ตอนกำลังโหลด
        
        // 4. ล็อคปุ่มชั่วคราว
        button.disabled = true;
        button.style.pointerEvents = 'none';
    }

    try {
        const bookmarkRef = doc(db, 'users', currentUser.uid, 'bookmarks', animeId);
        const docSnap = await getDoc(bookmarkRef);

        if (docSnap.exists()) {
            // ลบ Bookmark
            await deleteDoc(bookmarkRef);
            userBookmarks = userBookmarks.filter(id => id !== animeId); // 🌟 เอาออกจาก Array
            if (icon) {
                // กลับไปเป็นไอคอนโปร่ง (ยังไม่เซฟ)
                icon.className = 'fa-regular fa-bookmark';
                icon.style.color = '';
            }
        } else {
            // เพิ่ม Bookmark
            await setDoc(bookmarkRef, { animeId: animeId, addedAt: new Date() });
            if (!userBookmarks.includes(animeId)) userBookmarks.push(animeId); // 🌟 ใส่เข้าไปใน Array
            if (icon) {
                // เปลี่ยนเป็นไอคอนทึบ (เซฟแล้ว)
                icon.className = 'fa-solid fa-bookmark';
                icon.style.color = 'var(--accent)'; 
            }
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        
        // 5. ถ้ามี Error (เช่น เน็ตหลุด) ให้คืนค่าไอคอนกลับไปเป็นเหมือนเดิมก่อนกด
        if (icon) {
            icon.className = isCurrentlyBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
            icon.style.color = isCurrentlyBookmarked ? 'var(--accent)' : '';
        }
        alert("เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง");
        
    } finally {
        // 6. ไม่ว่าจะสำเร็จหรือพัง ก็ต้องปลดล็อคปุ่มให้กลับมากดได้เหมือนเดิม
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
// 7. ฟังก์ชันช่วยเหลือ & UI
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

function goToPlayer(animeId) {
    if (document.getElementById('app-content')) {
        loadPlayer(animeId, 1);
    } else {
        window.location.href = `index.html?play=${animeId}`;
    }
}

function generateGridHTML(list) {
    let html = `<div class="anime-grid">`;
    if(list.length === 0) {
        html += `<p style="padding: 0 50px; color: var(--text-muted);">No anime found.</p>`;
    } else {
        list.forEach(anime => {
            const quality = anime.quality || 'HD'; 
            
            // 🌟 เช็คว่าอนิเมะเรื่องนี้เคยโดน Bookmark หรือยัง?
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
// 8. หน้า Home & Genres
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
        setTimeout(hideLoading, 300);
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
// 9. ระบบค้นหา & Player
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

function loadPlayer(animeId, epNum) {
    showLoading();
    const anime = animeList.find(a => a.id === animeId);
    if(!anime || !anime.episodes || anime.episodes.length === 0) { hideLoading(); return; }

    currentAnimeData = anime;
    currentEpisodeData = anime.episodes.find(e => e.ep_num === epNum) || anime.episodes[0];
    
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
}

function switchEpisode(epNum) {
    if(!currentAnimeData) return;
    currentEpisodeData = currentAnimeData.episodes.find(e => e.ep_num === epNum);
    if(!currentEpisodeData) return;

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
// 10. ฟังก์ชันช่วยเหลือ & UI (ใส่เพิ่มเข้าไปต่อท้าย)
// ==========================================

function showNotification(message, type = 'success') {
    // 1. ตรวจสอบว่าเคยสร้างสไตล์ของ Toast หรือยัง ถ้ายังให้สร้าง
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

    // 2. สร้างกล่องคอนเทนเนอร์ (ถ้ายังไม่มี)
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // 3. สร้างตัวป๊อปอัปแจ้งเตือน
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check" style="color: #4caf50; font-size: 1.2rem;"></i>' : '<i class="fa-solid fa-circle-exclamation" style="color: #f44336; font-size: 1.2rem;"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    container.appendChild(toast);

    // 4. แอนิเมชันเลื่อนเข้า และตั้งเวลาลบออกอัตโนมัติ
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // รอแอนิเมชันออกเสร็จแล้วค่อยลบทิ้ง
    }, 3000); // โชว์ค้างไว้ 3 วินาที
}

// ==========================================
// 11. แก้บั๊ก <script type="module"> (สำคัญมาก!)
// ==========================================
// การใช้ type="module" ทำให้ HTML มองไม่เห็นฟังก์ชันด้านบน
// ต้องเอาฟังก์ชันทั้งหมดมาแขวนไว้บนหน้าต่าง window แบบนี้:

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