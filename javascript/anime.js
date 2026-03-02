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

const animes_data = [{
        name: "Yuru Camp [ Season 1 ]",
        title: ["Yuru Camp", "Yurucamp", "Laid-Back Camp", "laid back camp season 1"],
        image: "https://istoon.com/uploads/anime/coverImage/large/yuru_camp____5f8f33f07e048_bx98444-zzhSw9o3LJSy.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.12",
        link: "Yurucamp.html"
    },
    {
        name: "Yuru Camp [ Season 2 ]",
        title: ["Yuru Camp", "Yurucamp", "Laid-Back Camp", "laid back camp season 2"],
        image: "https://upload.wikimedia.org/wikipedia/en/4/46/Laid-Back_Camp_season_2_main_visual.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.13",
        link: "Yurucamp2.html"
    },

    {
        name: "Yuru Camp [ Season 3 ]",
        title: ["Yuru Camp", "Yurucamp", "Laid-Back Camp", "laid back camp season 3"],
        image: "https://news.dexclub.com/wp-content/uploads/2023/07/yc3_teaser01.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.12",
        link: "Yurucamp3.html"
    },
    {
        name: "Yuru Camp Movie",
        title: ["Yuru Camp", "Yurucamp", "Laid-Back Camp", "Yuru Camp Movie", "laid back camp movie"],
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Yuru_Camp_Movie_poster.jpg/250px-Yuru_Camp_Movie_poster.jpg",
        tags: "a slice-of-life, comedy",
        ep: "EP.1",
        link: "Yurucampmovie.html"
    },
    {
        name: "Kaede to Suzu THE ANIMATION",
        title: ["Love me: Kaede to Suzu THE ANIMATION", "Kaede to Suzu THE ANIMATION"],
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
    {
        name: "Summer ghost",
        title: ["Summer ghost", "Summer Ghost"],
        image: "https://upload.wikimedia.org/wikipedia/en/5/5d/Summer_Ghost_poster.jpg",
        tags: "psychological drama, supernatural",
        ep: "EP.1",
        link: "SummerGhost.html"
    },
    {
        name: "Chainsaw Man – The Movie: Reze Arc",
        title: ["Chainsaw Man – The Movie: Reze Arc", "Chainsaw Man Movie", "Chainsaw Man Reze Arc"],
        image: "https://m.media-amazon.com/images/M/MV5BYmUzMTk5MGQtZDg5Yy00MWEzLWIzNjUtNWIyMjFjODhiYjcyXkEyXkFqcGc@._V1_.jpg",
        tags: "Action, Horror, Supernatural",
        ep: "EP.1",
        link: "ChainsawManTheMovieRezeArc.html"
    },
    {
        name: "Chainsaw Man",
        title: ["Chainsaw Man", "Chainsaw Man Season 1"],
        image: "https://m.media-amazon.com/images/M/MV5BZGY2ZTM2MWMtNzA2OS00ZjJlLWIwZTMtMDBhN2EwYjZjZjEyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        tags: "Action, Horror, Supernatural",
        ep: "EP.12",
        link: "ChainsawMan.html"
    },
    {
        name: "K-on!",
        title: ["K-on!", "K-On! Season 1", "K on 1"],
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/K-On%21_season_1_key_visual.png/250px-K-On%21_season_1_key_visual.png",
        tags: "Comedy, Slice of Life",
        ep: "EP.13 [+OVA]",
        link: "K-on.html"
    },
    {
        name: "K-on!!",
        title: ["K-on!!", "K-On! Season 2", "K on 2","kei on season 2"],
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/K-On%21_season_2_key_visual.png/250px-K-On%21_season_2_key_visual.png",
        tags: "Comedy, Slice of Life",
        ep: "EP.26 [+OVA]",
        link: "K-on2.html"
    },
    {
        name: "K-on!: The Movie",
        title: ["K-on! Movie", "K-On! Movie", "K on movie","k-on movie","K-on! The Movie","K On The Movie","kei on the movie"],
        image: "https://play-lh.googleusercontent.com/c_nePAJ1An-ZmucfbWhSZn2fnSdkDW6UGAw1vnQzD7HZON_JjCRP_5YuMkOUz5iUZcD9piKCBVVmqYkdgtu4",
        tags: "Comedy, Slice of Life",
        ep: "EP.1",
        link: "K-onmovie.html"
    },
    {
        name: "I want to eat your pancreas",
        title: ["I want to eat your pancreas", "Kimi no Suizou wo Tabetai", "Kimi no Suizou wo Tabetai Movie","I want to eat your pancreas movie"],
        image: "https://m.media-amazon.com/images/M/MV5BMmE4ZTA3NmEtNGM2Zi00NGM4LTk2NDctODYxMTJmMzgyZWRlXkEyXkFqcGc@._V1_.jpg",
        tags: "Romance, Drama",
        ep: "EP.1",
        link: "IWantToEatYourPancreas.html"
    },
    {
        name: "Tamako market",
        title: ["Tamako market"],
        image: "https://www.kyotoanimation.co.jp/en/img/works/key_visual/tamako.jpg",
        tags: "Comedy, Slice of Life",
        ep: "EP.12",
        link: "TamakoMarket.html"
    },
    {
        name: "Tamako love story",
        title: ["Tamako love story"],
        image: "https://m.media-amazon.com/images/M/MV5BNjQ2ZjkxNTctZjI3Yi00MDM1LWI3MWEtMTcxMTU4MzQ5MzhhXkEyXkFqcGc@._V1_.jpg",
        tags: "Comedy, Slice of Life",
        ep: "EP.1",
        link: "TamakoLoveStory.html"
    },
    {
        name: "Wash it all Away",
        title: ["Wash it all Away","kirei ni shitemoraemasu ka?"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhs-3vQeXk1g4kXN-FX9Lwdgv8VNcGVHf5A&s",
        tags: "Comedy, Slice of Life",
        ep: "EP.8",
        link: "WashItAllAway.html"
    },
    {
        name: "Your name.",
        title: ["Your name.", "Kimi no Na wa", "Kimi no Na wa Movie"],
        image: "https://f.ptcdn.info/637/041/000/o5b7n2iwa0qA2z61aqu-o.jpg",
        tags: "Romance, Drama",
        ep: "EP.1",
        link: "YourName.html"
    },
    {
        name: "Maquia: When the Promised Flower Blooms",
        title: ["Maquia: When the Promised Flower Blooms", "Maquia Movie","Sayounara no Asa ni Yakusoku no Hana wo Kazarou"],
        image: "https://upload.wikimedia.org/wikipedia/en/a/a8/SayoAsa_Theatrical_Release_Poster.jpg",
        tags: "Fantasy, Drama",
        ep: "EP.1",
        link: "Maquia.html"
    },
    {
        name: "Doukyo Suru Neneki",
        title: ["Doukyo Suru Neneki"],
        image: "https://i0.wp.com/hentaihd.net/wp-content/uploads/2026/01/Doukyo-Suru-Neneki-Episode-1-Poster-2.jpg?fit=725%2C1024&ssl=1",
        tags: "Hentai",
        ep: "EP.2",
        link: "DoukyoSuruNeneki.html"
    },

];

if (window.location.pathname.endsWith('Anime.html')) {
    function renderAnimeGrid() {
    const gridContainer = document.getElementById('animeGrid');

    gridContainer.innerHTML = '';

    function createCardHTML(categoryAnimes, container) {
        categoryAnimes.forEach(anime => {
            const cardHTML = `
            <a href="${anime.link}" class="anime-card">
                <div class="card-img-wrapper">
                    <img src="${anime.image}" alt="${anime.name}">
                    <div class="play-overlay">
                        <span>▶</span>
                    </div>
                </div>
                <div class="card-info">
                    <h3 class="card-title">${anime.name}</h3>
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

    createCardHTML(animes_data, animeGrid);
    }

    renderAnimeGrid();
}

if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
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
        title: ["Your name."],
        image: "https://f.ptcdn.info/637/041/000/o5b7n2iwa0qA2z61aqu-o.jpg",
        tags: "Romance, Drama",
        ep: "EP.1",
        link: "YourName.html"
    },
    {
        title: ["The \"Hentai\" Prince and the Stony Cat."],
        image: "https://cdn.myanimelist.net/images/anime/3/75788.jpg",
        tags: "Harem, Comedy, Romance",
        ep: "EP.12",
        link: "HentaiPrinceAndStonyCat.html"
    },
    
];
const newAnimes = [{
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

renderAnimeGrid();
}

document.body.classList.add('loading');

window.addEventListener('load', function() {

    document.body.classList.remove('loading');

    document.body.classList.add('loaded');
    
});