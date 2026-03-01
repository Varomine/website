const episodes = [{
            id: 1,
            title: "Episode 1",
            url: "https://short.icu/xUZTQl9KK"
        },
        {
            id: 2,
            title: "Episode 2",
            url: "https://short.icu/IGy68qGl4"
        },
        {
            id: 3,
            title: "Episode 3",
            url: "https://short.icu/dWK7ZkEjV"
        },
        {
            id: 4,
            title: "Episode 4",
            url: "https://short.icu/4Uy11GB8H"
        },
        {
            id: 5,
            title: "Episode 5",
            url: "https://short.icu/_SMK2LcCS"
        },
        {
            id: 6,
            title: "Episode 6",
            url: "https://short.icu/Xw7BwCDJr"
        },
        {
            id: 7,
            title: "Episode 7",
            url: "https://short.icu/VWkr9gxwL"
        },
        {
            id: 8,
            title: "Episode 8",
            url: "https://short.icu/_X0xkU0hv"
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