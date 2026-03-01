const episodes = [{
            id: 1,
            title: "Episode 1",
            url: "https://short.icu/fdPHdOfJN"
        },
        {
            id: 2,
            title: "Episode 2",
            url: "https://short.icu/xVFsdkaGU"
        },
        {
            id: 3,
            title: "Episode 3",
            url: "https://short.icu/2Jma8Et2o"
        },
        {
            id: 4,
            title: "Episode 4",
            url: "https://short.icu/sY1nyhjEk"
        },
        {
            id: 5,
            title: "Episode 5",
            url: "https://short.icu/tfaBTAcdk"
        },
        {
            id: 6,
            title: "Episode 6",
            url: "https://short.icu/8cwKP2rMI"
        },
        {
            id: 7,
            title: "Episode 7",
            url: "https://short.icu/Vs8lnx3td"
        },
        {
            id: 8,
            title: "Episode 8",
            url: "https://short.icu/26Rkjd5Pv"
        },
        {
            id: 9,
            title: "Episode 9",
            url: "https://short.icu/GnX6c6NhM"
        },
        {
            id: 10,
            title: "Episode 10",
            url: "https://short.icu/DoQll6uOK"
        },
        {
            id: 11,
            title: "Episode 11",
            url: "https://short.icu/zlB_h0w9M"
        },
        {
            id: 12,
            title: "Episode 12",
            url: "https://short.icu/Ryd-yknJn"
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