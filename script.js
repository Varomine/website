document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {

    if (e.keyCode == 123) {
        window.location.href = "https://www.google.com";
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        window.location.href = "https://www.google.com";
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        window.location.href = "https://www.google.com";
        return false;
    }

    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
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

let animeList = [];
let currentAnimeData = null;
let currentEpisodeData = null;

// 1. ตรวจสอบว่าอยู่หน้าไหน และจัดการ Routing ตอนโหลดเว็บ
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        animeList = await response.json();
        
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        const playId = urlParams.get('play');
        const genreQuery = urlParams.get('genre');

        if (document.getElementById('app-content')) {
            if (playId) {
                loadPlayer(playId, 1);
            } else if (searchQuery) {
                document.getElementById('searchInput').value = searchQuery;
                executeSearch(searchQuery);
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

// --- ระบบ Loading ตรวจสอบรูปภาพ ---

function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if(overlay) {
        overlay.style.display = 'flex';
        updateProgress(0);
    }
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if(overlay) {
        overlay.style.display = 'none';
    }
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

    if (totalImages === 0) {
        callback(); 
        return;
    }

    images.forEach(img => {
        img.onload = img.onerror = () => {
            loadedImages++;
            updateProgress(Math.round((loadedImages / totalImages) * 100));
            
            if (loadedImages === totalImages) {
                callback();
            }
        };
    });
}

// --- ฟังก์ชันช่วยเหลือ ---

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
            html += `
                <div class="anime-card" onclick="goToPlayer('${anime.id}')">
                    <img src="${anime.image}" alt="${anime.title}" class="anime-img">
                    <div class="anime-info">
                        <h3>${anime.title}</h3>
                        <span>${anime.genres.join(', ')}</span>
                    </div>
                </div>
            `;
        });
    }
    html += `</div>`;
    return html;
}

// --- ส่วนของหน้า Home (index.html) ---

function loadHome() {
    showLoading();
    const app = document.getElementById('app-content');
    if(!app || animeList.length === 0) { hideLoading(); return; }

    const featured = animeList[0];
    const tempContainer = document.createElement('div');
    
    tempContainer.innerHTML = `
        <div class="banner" style="background-image: url('${featured.banner}');">
            <div class="banner-overlay"></div>
            <div class="banner-content">
                <h1 style="font-size:3rem;">${featured.title}</h1>
                <p style="color:var(--text-muted); margin:10px 0 20px;">${featured.synopsis}</p>
                <button class="btn-primary" onclick="goToPlayer('${featured.id}')">
                    <i class="fa-solid fa-play"></i> Watch Now
                </button>
            </div>
        </div>
        <h2 class="section-title">Latest Updates</h2>
        ${generateGridHTML(animeList)}
    `;

    waitForImages(tempContainer, () => {
        app.innerHTML = tempContainer.innerHTML;
        window.scrollTo(0, 0);
        setTimeout(hideLoading, 300);
    });
}

// --- ส่วนของหน้า Genres (genres.html) ---

function generateGenresPage() {
    const genresSet = new Set();
    animeList.forEach(anime => {
        if(anime.genres) {
            anime.genres.forEach(g => genresSet.add(g));
        }
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

    const resultsContainer = document.getElementById('genres-results');
    resultsContainer.innerHTML = `
        <h2 class="section-title" style="font-size:1.2rem; color:var(--text-muted);">Showing: ${genre}</h2>
        ${generateGridHTML(filtered)}
    `;
}

// --- ระบบค้นหา ---

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

// --- หน้า Player ดูอนิเมะ & เลือกระบบ Server ---

// --- หน้า Player ดูอนิเมะ & เลือกระบบ Server (เวอร์ชัน Iframe) ---

// --- 1. ฟังก์ชันสร้างหน้า Player (เพิ่มตัว Loader ลงใน HTML) ---
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

// --- 2. ฟังก์ชันเปลี่ยนตอน (เพิ่มระบบ Loading) ---
function switchEpisode(epNum) {
    if(!currentAnimeData) return;
    
    currentEpisodeData = currentAnimeData.episodes.find(e => e.ep_num === epNum);
    if(!currentEpisodeData) return;

    const iframe = document.getElementById('anime-video');
    const videoLoader = document.getElementById('video-player-loader');
    
    // แสดงหน้าโหลด
    if(videoLoader) videoLoader.style.display = 'flex';

    // ตั้งค่าให้ซ่อนหน้าโหลดเมื่อ Iframe โหลดเสร็จ
    iframe.onload = function() {
        if(videoLoader) videoLoader.style.display = 'none';
    };

    const newVideoUrl = (currentEpisodeData.servers && currentEpisodeData.servers.length > 0) 
                 ? currentEpisodeData.servers[0].video_url 
                 : (currentEpisodeData.video_url || "");
    
    // เปลี่ยน URL ของวิดีโอ (จะทำให้ iframe เริ่มโหลดใหม่และเรียกใช้ iframe.onload ด้านบน)
    iframe.src = newVideoUrl;

    // อัปเดตข้อมูล UI อื่นๆ
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

// --- 3. ฟังก์ชันเปลี่ยนเซิร์ฟเวอร์ (เพิ่มระบบ Loading) ---
function switchServer(serverIndex) {
    if(!currentEpisodeData || !currentEpisodeData.servers) return;
    
    const server = currentEpisodeData.servers[serverIndex];
    const iframe = document.getElementById('anime-video');
    const videoLoader = document.getElementById('video-player-loader');

    // แสดงหน้าโหลด
    if(videoLoader) videoLoader.style.display = 'flex';
    
    // ตั้งค่าให้ซ่อนหน้าโหลดเมื่อ Iframe โหลดเซิร์ฟเวอร์ใหม่เสร็จ
    iframe.onload = function() {
        if(videoLoader) videoLoader.style.display = 'none';
    };

    // เปลี่ยน URL ไปยังเซิร์ฟเวอร์ใหม่
    iframe.src = server.video_url;

    // อัปเดตสีปุ่มเซิร์ฟเวอร์
    const buttons = document.querySelectorAll('.server-btn');
    buttons.forEach((btn, idx) => {
        if(idx === serverIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.getElementById('video-status-text').innerText = `Now Playing from ${server.name}`;
}

function resetVideo() {
    const iframeElement = document.getElementById('anime-video');
    if(iframeElement) {
        const currentSrc = iframeElement.src;
        iframeElement.src = '';
        setTimeout(() => {
            iframeElement.src = currentSrc;
        }, 100);
    }
}