const episodes = [{
        id: 1,
        title: "Episode 1",
        url: "https://short.icu/mJ6t7_0pS"
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