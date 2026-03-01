if (window.location.pathname.includes("TamakoLoveStory.html")) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            url: "https://short.icu/JHPVnmcf2"
        },
        
    ];
    const player = document.getElementById('mainPlayer');
    const titleDisplay = document.getElementById('currentTitle');
    const episodeTitleDisplay = document.getElementById('Episode_Title');
    const episodeListContainer = document.getElementById('episodeList');

    function playEpisode(index) {
        const episode = episodes[index];

        player.src = episode.url;
        titleDisplay.innerText = episode.title;
        episodeTitleDisplay.innerText = episode.episodeTitle;
        

        const allButtons = document.querySelectorAll('.episode-btn');
        allButtons.forEach(btn => btn.classList.remove('active'));

        allButtons[index].classList.add('active');
    }

    function renderPlaylist() {
        episodes.forEach((episode, index) => {
            const button = document.createElement('button');
            button.className = 'episode-btn';
            button.innerText = episode.title;
            const firstclick = false;
            if (firstclick == false) {
                document.getElementById('resetbtn').onclick = () => playEpisode(0);
            }
            button.onclick = () => {playEpisode(index); const episodess = index; const resetButton = document.getElementById('resetbtn'); resetButton.onclick = () => playEpisode(episodess); firstclick = true;};
            episodeListContainer.appendChild(button);
        });
    }

    renderPlaylist();
    playEpisode(0);
}

if (window.location.pathname.includes("TamakoMarket.html")) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            url: "https://short.icu/AUDoSKXrm"
        },
        {
            id: 2,
            title: "Episode 2",
            url: "https://short.icu/w5I88KVN7"
        },
        {
            id: 3,
            title: "Episode 3",
            url: "https://short.icu/qFxH5cNj_N"
        },
        {
            id: 4,
            title: "Episode 4",
            url: "https://short.icu/auJMnjAIn"
        },
        {
            id: 5,
            title: "Episode 5",
            url: "https://short.icu/r6fXKymk6"
        },
        {
            id: 6,
            title: "Episode 6",
            url: "https://short.icu/gQlpDCMimM"
        },
        {
            id: 7,
            title: "Episode 7",
            url: "https://short.icu/ifL9tMoi0"
        },
        {
            id: 8,
            title: "Episode 8",
            url: "https://short.icu/99Q5iDh5nq"
        },
        {
            id: 9,
            title: "Episode 9",
            url: "https://short.icu/FVNaTpTfS"
        },
        {
            id: 10,
            title: "Episode 10",
            url: "https://short.icu/lBQv7wiYI"
        },
        {
            id: 11,
            title: "Episode 11",
            url: "https://short.icu/dHDel7Qfp"
        },
        {
            id: 12,
            title: "Episode 12",
            url: "https://short.icu/fdhKn_eyGb"
        },
        
    ];
    const player = document.getElementById('mainPlayer');
    const titleDisplay = document.getElementById('currentTitle');
    const episodeTitleDisplay = document.getElementById('Episode_Title');
    const episodeListContainer = document.getElementById('episodeList');

    function playEpisode(index) {
        const episode = episodes[index];

        player.src = episode.url;
        titleDisplay.innerText = episode.title;
        episodeTitleDisplay.innerText = episode.episodeTitle;
        

        const allButtons = document.querySelectorAll('.episode-btn');
        allButtons.forEach(btn => btn.classList.remove('active'));

        allButtons[index].classList.add('active');
    }

    function renderPlaylist() {
        episodes.forEach((episode, index) => {
            const button = document.createElement('button');
            button.className = 'episode-btn';
            button.innerText = episode.title;
            const firstclick = false;
            if (firstclick == false) {
                document.getElementById('resetbtn').onclick = () => playEpisode(0);
            }
            button.onclick = () => {playEpisode(index); const episodess = index; const resetButton = document.getElementById('resetbtn'); resetButton.onclick = () => playEpisode(episodess); firstclick = true;};
            episodeListContainer.appendChild(button);
        });
    }

    renderPlaylist();
    playEpisode(0);
}