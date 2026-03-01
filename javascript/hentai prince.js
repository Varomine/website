const episodes = [{
        id: 1,
        title: "Episode 1",
        url: "https://short.icu/iZXcMTrzV"
    },
    {
        id: 2,
        title: "Episode 2",
        url: "https://short.icu/yewAidMvi"
    },
    {
        id: 3,
        title: "Episode 3",
        url: "https://short.icu/xAqF2TmrxH"
    },
    {
        id: 4,
        title: "Episode 4",
        url: "https://short.icu/WcpLG7PDW"
    },
    {
        id: 5,
        title: "Episode 5",
        url: "https://short.icu/jE9r8A7x0P"
    },
    {
        id: 6,
        title: "Episode 6",
        url: "https://short.icu/4Rd8G24te"
    },
    {
        id: 7,
        title: "Episode 7",
        url: "https://short.icu/Pa4LXRLHf"
    },
    {
        id: 8,
        title: "Episode 8",
        url: "https://short.icu/FVh_n_eEL"
    },
    {
        id: 9,
        title: "Episode 9",
        url: "https://short.icu/ksrm9teWZ"
    },
    {
        id: 10,
        title: "Episode 10",
        url: "https://short.icu/d5RS-ABby"
    },
    {
        id: 11,
        title: "Episode 11",
        url: "https://short.icu/RxRGhAhYAr"
    },
    {
        id: 12,
        title: "Episode 12",
        url: "https://short.icu/UjWWG4kCu"
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