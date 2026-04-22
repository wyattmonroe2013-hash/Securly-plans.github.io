const JSON_FILE = './games.json'; // Added ./ for GitHub Pages compatibility

async function init() {
    try {
        const response = await fetch(JSON_FILE);
        if (!response.ok) throw new Error("JSON not found");
        const games = await response.json();

        const homeContainer = document.getElementById('game-container');
        const playerWrapper = document.getElementById('game-player');

        // --- HOME PAGE LOGIC ---
        if (homeContainer) {
            const render = (data) => {
                if (data.length === 0) {
                    homeContainer.innerHTML = "<p>No games found.</p>";
                    return;
                }
                homeContainer.innerHTML = data.map(game => `
                    <a href="play.html?id=${game.id}" class="game-card">
                        <img src="${game.thumbnail}" alt="${game.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                        <div class="card-info">
                            <h3>${game.title}</h3>
                            <p>${game.category}</p>
                        </div>
                    </a>
                `).join('');
            };

            render(games);

            const searchBar = document.getElementById('searchBar');
            if (searchBar) {
                searchBar.addEventListener('input', (e) => {
                    const filtered = games.filter(g => 
                        g.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        g.category.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    render(filtered);
                });
            }
        }

        // --- PLAY PAGE LOGIC ---
        if (playerWrapper) {
            const params = new URLSearchParams(window.location.search);
            const gameId = parseInt(params.get('id'));
            const game = games.find(g => g.id === gameId);

            if (game) {
                playerWrapper.innerHTML = `
                    <div class="game-screen">
                        <iframe src="${game.url}" allowfullscreen id="game-iframe"></iframe>
                    </div>
                    <div class="game-info-panel">
                        <div class="game-title-area">
                            <span class="category-pill">${game.category}</span>
                            <h1>${game.title}</h1>
                        </div>
                        <div class="actions-area">
                            <button onclick="toggleFullscreen()">⛶ Fullscreen</button>
                        </div>
                    </div>
                `;
                document.title = "Playing " + game.title;
            } else {
                playerWrapper.innerHTML = `<h1>Game not found</h1><a href="index.html">Back to Home</a>`;
            }
        }
    } catch (err) {
        console.error("Initialization error:", err);
    }
}

// Fullscreen helper
window.toggleFullscreen = function() {
    const elem = document.getElementById("game-iframe");
    if (elem) {
        if (elem.requestFullscreen) elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    }
}

init();
