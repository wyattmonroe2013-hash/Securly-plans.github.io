async function loadGames() {
    try {
        const response = await fetch('games.json');
        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error("Error loading games:", error);
    }
}

async function loadVideos() {
    try {
        const response = await fetch('videos.json');
        const games = await response.json();
        displayVideos(Videos);
    } catch (error) {
        console.error("Error loading moeves:", error);
    }
}

function displayGames(games) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = games.map(game => `
        <div class="game-card" onclick="window.location.href='play.html?id=${game.id}'">
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
        </div>
    `).join('');
}

function displayVideos(Videos) {
    const grid = document.getElementById('videoGrid');
    grid.innerHTML = videos.map(video => `
        <div class="video-card" onclick="window.location.href='watch.html?id=${video.id}'">
            <img src="${video.thumbnail}" alt="${video.title}">
            <h3>${video.title}</h3>
        </div>
    `).join('');
}
loadGames();
