if (window.location.pathname.endsWith('K-on.html')) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            url: "https://short.icu/QNJizk-zn"
        },
        {
            id: 2,
            title: "Episode 2",
            url: "https://short.icu/pb7pzGZcT"
        },
        {
            id: 3,
            title: "Episode 3",
            url: "https://short.icu/jCuaZ9KkN"
        },
        {
            id: 4,
            title: "Episode 4",
            url: "https://short.icu/Wix61acikC"
        },
        {
            id: 5,
            title: "Episode 5",
            url: "https://short.icu/fI-9W1UwL"
        },
        {
            id: 6,
            title: "Episode 6",
            url: "https://short.icu/wHRBP2q-A"
        },
        {
            id: 7,
            title: "Episode 7",
            url: "https://short.icu/lcfyzn7kq"
        },
        {
            id: 8,
            title: "Episode 8",
            url: "https://short.icu/rGlUwM-o0"
        },
        {
            id: 9,
            title: "Episode 9",
            url: "https://short.icu/arXzPnQla"
        },
        {
            id: 10,
            title: "Episode 10",
            url: "https://short.icu/B12Dq9Mvm"
        },
        {
            id: 11,
            title: "Episode 11",
            url: "https://short.icu/AOrwcXzdVb"
        },
        {
            id: 12,
            title: "Episode 12",
            url: "https://short.icu/7On3OGNbo"
        },
        {
            id: 13,
            title: "Episode 13",
            url:"https://short.icu/gN4ZcQO6v"
        },
        {
            id: 14,
            title: "OVA",
            url:"https://short.icu/F1alyHUqL"
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
                button.onclick = () => {
                    playEpisode(index);
                    const episodess = index;
                    const resetButton = document.getElementById('resetbtn');
                    resetButton.onclick = () => playEpisode(episodess);
                    firstclick = true;
                };
                episodeListContainer.appendChild(button);
            
});
}
renderPlaylist();
playEpisode(0);
}

if (window.location.pathname.endsWith('K-on2.html')) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            url: "https://short.icu/tyuwDMois"
        },
        {
            id: 2,
            title: "Episode 2",
            url: "https://short.icu/nY-ig4Q1f"
        },
        {
            id: 3,
            title: "Episode 3",
            url: "https://short.icu/mCLFfoQ2n"
        },
        {
            id: 4,
            title: "Episode 4",
            url: "https://short.icu/eyYVmlq055"
        },
        {
            id: 5,
            title: "Episode 5",
            url: "https://short.icu/VdfayE6oB"
        },
        {
            id: 6,
            title: "Episode 6",
            url: "https://short.icu/vmpHhRY_9"
        },
        {
            id: 7,
            title: "Episode 7",
            url: "https://short.icu/7uiV9gb2F"
        },
        {
            id: 8,
            title: "Episode 8",
            url: "https://short.icu/6brNkH8wW"
        },
        {
            id: 9,
            title: "Episode 9",
            url: "https://short.icu/TTCokCPn-5"
        },
        {
            id: 10,
            title: "Episode 10",
            url: "https://short.icu/vx2bmMgG6"
        },
        {
            id: 11,
            title: "Episode 11",
            url: "https://short.icu/5tFaDqnVD"
        },
        {
            id: 12,
            title: "Episode 12",
            url: "https://short.icu/qb85TRG-J"
        },
        {
            id: 13,
            title: "Episode 13",
            url:"https://short.icu/rcl83dLjPa"
        },
        {
            id: 14,
            title: "Episode 14",
            url:"https://short.icu/DwRQunXQc"
        },
        {
            id: 15,
            title: "Episode 15",
            url:"https://short.icu/V9pBS7TWm"
        },
        {
            id: 16,
            title: "Episode 16",
            url:"https://short.icu/OYAZvgz5c"
        },
        {
            id: 17,
            title: "Episode 17",
            url:"https://short.icu/DT8bWL8IH"
        },
        {
            id: 18,
            title: "Episode 18",
            url:"https://short.icu/jcLZ2ot-W"
        },
        {
            id: 19,
            title: "Episode 19",
            url:"https://short.icu/hgjfyHQLZ"
        },
        {
            id: 20,
            title: "Episode 20",
            url:"https://short.icu/La2W_GhmN"
        },
        {
            id: 21,
            title: "Episode 21",
            url:"https://short.icu/dbReVLb2j"
        },
        {
            id: 22,
            title: "Episode 22",
            url:"https://short.icu/wp_QAwgYv"
        },
        {
            id: 23,
            title: "Episode 23",
            url:"https://short.icu/gnS9dgguH"
        },
        {
            id: 24,
            title: "Episode 24",
            url:"https://short.icu/15irNGVzTd"
        },
        {
            id: 25,
            title: "Episode 25",
            url:"https://short.icu/QOwJ_1OD-"
        },
        {
            id: 26,
            title: "Episode 26",
            url:"https://short.icu/COrIqaaSH"
        },
        {
            id: 27,
            title: "OVA",
            url:"https://short.icu/QUcKtq7tx"
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
                button.onclick = () => {
                    playEpisode(index);
                    const episodess = index;
                    const resetButton = document.getElementById('resetbtn');
                    resetButton.onclick = () => playEpisode(episodess);
                    firstclick = true;
                };
                episodeListContainer.appendChild(button);
            
});
}
renderPlaylist();
playEpisode(0);
}

if (window.location.pathname.endsWith('K-onmovie.html')) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            url: "https://short.icu/ptbwIiijN"
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