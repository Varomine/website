if (window.location.pathname.endsWith('Yurucamp.html')) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            episodeTitle: "Mount Fuji and Curry Noodles",
            url: "https://short.icu/b0hDPCqfp"
        },
        {
            id: 2,
            title: "Episode 2",
            episodeTitle: "Welcome to the Outdoor Activities Club",
            url: "https://short.icu/3W_jmvsvh"
        },
        {
            id: 3,
            title: "Episode 3",
            episodeTitle: "Mount Fuji and Relaxed Hot Pot Camp",
            url: "https://short.icu/AT7Gasdof"
        },
        {
            id: 4,
            title: "Episode 4",
            episodeTitle: "The Outdoor Activities Club and the Solo Camping Girl",
            url: "https://short.icu/gq8vMUuKY"
        },
        {
            id: 5,
            title: "Episode 5",
            episodeTitle: "Two Camps, Two Campers' Views",
            url: "https://short.icu/tKgdKcf44"
        },
        {
            id: 6,
            title: "Episode 6",
            episodeTitle: "Meat and Fall Colors and the Mystery Lake",
            url: "https://short.icu/0Hicg_SU3"
        },
        {
            id: 7,
            title: "Episode 7",
            episodeTitle: "A Night on the Lake Shore and Campers",
            url: "https://short.icu/6x7id1dyF"
        },
        {
            id: 8,
            title: "Episode 8",
            episodeTitle: "Exams, Caribou, Steamed Buns, Yum!",
            url: "https://short.icu/lqlu2MC5KU"
        },
        {
            id: 9,
            title: "Episode 9",
            episodeTitle: "A Night of Navigator Nadeshiko and Hot Spring Steam",
            url: "https://short.icu/_tvSSY28q"
        },
        {
            id: 10,
            title: "Episode 10",
            episodeTitle: "Clumsy Travelers and Camp Meetings",
            url: "https://short.icu/8I2cQ2mzl"
        },
        {
            id: 11,
            title: "Episode 11",
            episodeTitle: "Christmas Camp!",
            url: "https://short.icu/yBdBvKul0"
        },
        {
            id: 12,
            title: "Episode 12",
            episodeTitle: "Mount Fuji and the Laid-Back Camp Girls",
            url: "https://short.icu/krw04xZ7S"
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

if (window.location.pathname.endsWith('Yurucampmovie.html')) {
    const episodes = [{
            id: 1,
            title: "Movie 1",
            episodeTitle: "Movie 1",
            url: "https://short.icu/nwxlUThhp"
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

if (window.location.pathname.endsWith('Yurucamp2.html')) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            episodeTitle: "Curry Noodles Are the Best Travel Companion",
            url: "https://short.icu/Hy2AE-5Xp"
        },
        {
            id: 2,
            title: "Episode 2",
            episodeTitle: "New Year's Solo Camper Girl",
            url: "https://short.icu/MUDdq3TIA"
        },
        {
            id: 3,
            title: "Episode 3",
            episodeTitle: "Surprise Camping and Some Deep Thoughts",
            url: "https://short.icu/Iak_Ob6b5"
        },
        {
            id: 4,
            title: "Episode 4",
            episodeTitle: "What Are You Buying With Your Temp Job Money?",
            url: "https://short.icu/JG6IUVykj"
        },
        {
            id: 5,
            title: "Episode 5",
            episodeTitle: "Caribou-kun and Lake Yamanaka",
            url: "https://short.icu/jyyNHaktd"
        },
        {
            id: 6,
            title: "Episode 6",
            episodeTitle: "Cape Ohmama in Winter",
            url: "https://short.icu/HV_ID-wYK"
        },
        {
            id: 7,
            title: "Episode 7",
            episodeTitle: "Nadeshiko's Solo Camp Planning",
            url: "https://short.icu/rtQUlBaeh"
        },
        {
            id: 8,
            title: "Episode 8",
            episodeTitle: "Camping Alone",
            url: "https://short.icu/CcWwigX9y"
        },
        {
            id: 9,
            title: "Episode 9",
            episodeTitle: "Winter's End and the Day of Departure",
            url: "https://short.icu/quGwu3GvR"
        },
        {
            id: 10,
            title: "Episode 10",
            episodeTitle: "The Izu Camp Trip Begins!",
            url: "https://short.icu/kXYeDBXZX"
        },
        {
            id: 11,
            title: "Episode 11",
            episodeTitle: "Izu Camping!! On the Way",
            url: "https://short.icu/Ksmxq2eLU2"
        },
        {
            id: 12,
            title: "Episode 12",
            episodeTitle: "Izu Camping!!! Birthdays!",
            url: "https://short.icu/DZC9PkyFq"
        },
        {
            id: 13,
            title: "Episode 13",
            episodeTitle: "I'm Home",
            url: "https://short.icu/fv3tXei1G"
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

if (window.location.pathname.endsWith('Yurucamp3.html')) {
    const episodes = [{
            id: 1,
            title: "Episode 1",
            episodeTitle: "Where Should We Go Next?",
            url: "https://short.icu/bw7bWfysAH"
        },
        {
            id: 2,
            title: "Episode 2",
            episodeTitle: "Mini Camping and Yard Camping",
            url: "https://short.icu/SVitH0thU"
        },
        {
            id: 3,
            title: "Episode 3",
            episodeTitle: "We're Off! Land of Suspension Bridges",
            url: "https://short.icu/qtQUge-i_"
        },
        {
            id: 4,
            title: "Episode 4",
            episodeTitle: "Hatanagi Attack! Death Road from Hell",
            url: "https://short.icu/V-BcA1EkR"
        },
        {
            id: 5,
            title: "Episode 5",
            episodeTitle: "Campfires and Beef Feasts",
            url: "https://short.icu/v2N-8boSO"
        },
        {
            id: 6,
            title: "Episode 6",
            episodeTitle: "See You Again Someday",
            url: "https://short.icu/ma406p6Ns"
        },
        {
            id: 7,
            title: "Episode 7",
            episodeTitle: "True or Embellished? Retrospective Camping",
            url: "https://short.icu/9n_evdwE2"
        },
        {
            id: 8,
            title: "Episode 8",
            episodeTitle: "The Food Porn Begins!!",
            url: "https://short.icu/KzElWIMUI"
        },
        {
            id: 9,
            title: "Episode 9",
            episodeTitle: "Touring and Checking Out the Cherry Blossoms",
            url: "https://short.icu/a3dfm65PH"
        },
        {
            id: 10,
            title: "Episode 10",
            episodeTitle: "Chikuwa, Trains, Chiaki's Solo Campin",
            url: "https://short.icu/t4nGPVU7Q"
        },
        {
            id: 11,
            title: "Episode 11",
            episodeTitle: "Scenery from Way Back",
            url: "https://short.icu/5zuCJnEjO"
        },
        {
            id: 12,
            title: "Episode 12",
            episodeTitle: "April 2nd: Cherry Blossom Camp Trip",
            url: "https://short.icu/rNJvYQ7P8"
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