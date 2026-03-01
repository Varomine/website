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

const animes = [{
        title: "Yuru Camp [ season 1 ]",
        image: "https://istoon.com/uploads/anime/coverImage/large/yuru_camp____5f8f33f07e048_bx98444-zzhSw9o3LJSy.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.12",
        link: "Yurucamp.html"
    },
    {
        title: "Yuru Camp [ season 2 ]",
        image: "https://upload.wikimedia.org/wikipedia/en/4/46/Laid-Back_Camp_season_2_main_visual.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.13",
        link: "Yurucamp2.html"
    },
    {
        title: "Yuru Camp [ season 3 ]",
        image: "https://news.dexclub.com/wp-content/uploads/2023/07/yc3_teaser01.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.12",
        link: "Yurucamp3.html"
    },
    {
        title: "Yuru Camp Movie",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Yuru_Camp_Movie_poster.jpg/250px-Yuru_Camp_Movie_poster.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.1",
        link: "Yurucampmovie.html"
    },
    {
        title: "Kaede to Suzu THE ANIMATION",
        image: "https://hentaihaven.red/wp-content/uploads/2022/10/c1191257package.jpg",
        tags: "Hentai",
        ep: "EP.3",
        link: "Kaede_to_Suzu_THE_ANIMATION.html"
    },
    {
        name: "The \"Hentai\" Prince and the Stony Cat.",
        title: ["Hentai Ouji to Warawanai Neko logo", "The Hentai Prince and the Stony Cat", "Laid-Back Camp", "laid back camp season 3"],
        image: "https://cdn.myanimelist.net/images/anime/3/75788.jpg",
        tags: "Harem, Comedy, Romance",
        ep: "EP.12",
        link: "HentaiPrinceAndStonyCat.html"
    },
    
];
const newAnimes = [{
        title: "Yuru Camp [ 1 ]",
        image: "https://istoon.com/uploads/anime/coverImage/large/yuru_camp____5f8f33f07e048_bx98444-zzhSw9o3LJSy.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.12",
        link: "Yurucamp.html"
    },
    {
        title: "Yuru Camp [ 2 ]",
        image: "https://upload.wikimedia.org/wikipedia/en/4/46/Laid-Back_Camp_season_2_main_visual.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.13",
        link: "Yurucamp2.html"
    },
    {
        title: "Yuru Camp [ 3 ]",
        image: "https://news.dexclub.com/wp-content/uploads/2023/07/yc3_teaser01.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.12",
        link: "Yurucamp3.html"
    },
    

];

function renderAnimeGrid() {
    const gridContainer = document.getElementById('animeGrid');
    const newGridContainer = document.getElementById('newAnimeGrid');

    gridContainer.innerHTML = '';
    newGridContainer.innerHTML = '';

    function createCardHTML(categoryAnimes, container) {
        categoryAnimes.forEach(anime => {
            const cardHTML = `
            <a href="${anime.link}" class="anime-card">
                <div class="card-img-wrapper">
                    <img src="${anime.image}" alt="${anime.title}">
                    <div class="play-overlay">
                        <span>▶</span>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="card-title">${anime.title}</h3>
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

    createCardHTML(animes, animeGrid);
    createCardHTML(newAnimes, newAnimeGrid);
}

// 3. สั่งให้ฟังก์ชันทำงานเมื่อโหลดไฟล์ JS
renderAnimeGrid();