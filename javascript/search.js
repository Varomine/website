const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q'); 

const searchKeywordDisplay = document.getElementById('searchKeyword');
const searchGrid = document.getElementById('searchGrid');

function renderCards(animesToRender, container) {
    container.innerHTML = '';
    animesToRender.forEach(anime => {
        const displayTitle = Array.isArray(anime.title) ? anime.name : anime.title;
        
        const cardHTML = `
            <a href="${anime.link}" class="anime-card">
                <div class="card-img-wrapper">
                    <img src="${anime.image}" alt="${displayTitle}">
                    <div class="play-overlay">
                        <span>▶</span>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="card-title">${displayTitle}</h3>
                    <div class="card-meta">
                        <span>${anime.tags}</span>
                        <span class="ep-badge">${anime.ep}</span>
                    </div>
                </div>
            </a>
        `;
        container.innerHTML += cardHTML;
    });
}

if (query) {
    searchKeywordDisplay.innerText = `"${query}"`;

    const searchQuery = query.toLowerCase().trim();

    // กรองข้อมูลจาก animes_data
    const filteredAnimes = animes_data.filter(anime => {
        
        const matchInTitles = Array.isArray(anime.title) 
            ? anime.title.some(t => t.toLowerCase().includes(searchQuery))
            : false;

        return matchInTitles;
    });

    // แสดงผล
    if (filteredAnimes.length > 0) {
        renderCards(filteredAnimes, searchGrid);
        console.log(`Found ${filteredAnimes.length} results for "${searchQuery}"`);
    } else {
        searchGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                <h3 style="color: #94a3b8; font-size: 1.5rem; margin-bottom: 1rem;">Anime not found 😥</h3>
                <p style="color: #64748b;">Please try another search term.</p>
                <a href="index.html" class="btn-play" style="margin-top: 1.5rem; font-size: 1rem; padding: 0.6rem 1.5rem;">Back to Home</a>
            </div>
        `;
    }
} else {
    searchKeywordDisplay.innerText = "No search query provided.";
    window.location.href = "index.html";
}