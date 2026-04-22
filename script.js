/**
 * Configuration & Data Fetching
 */
const JSON_URL = 'games.json';

// Utility function to fetch games
async function fetchGames() {
    try {
        const response = await fetch(JSON_URL);
        if (!response.ok) throw new Error("Could not load games data.");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

/**
 * HOME PAGE LOGIC
 * Runs if the element #game-container exists
 */
async function initHomePage() {
    const container = document.getElementById('game-container');
    if (!container) return; // Exit if we aren't on the home page

    const games = await fetchGames();
    const searchBar = document.getElementById('searchBar');

    // Function to render the HTML tiles
    const render = (data) => {
        container.innerHTML = data.map(game => `
            <a href="play.html?id=${game.id}" class="game-card">
                <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
                <div class="card-info">
                    <h3>${game.title}</h3>
                    <p>${game.category}</p>
                </div>
            </a>
        `).join('');
    };

    // Initial Render
    render(games);

    // Live Search Feature
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = games.filter(g => 
                g.title.toLowerCase().includes(term) || 
                g.category.toLowerCase().includes(term)
            );
            render(filtered);
        });
    }
}

/**
 * PLAY PAGE LOGIC
 * Runs if the element #game-player exists
 */
async function initPlayPage() {
    const playerWrapper = document.getElementById('game-player');
    if (!playerWrapper) return; // Exit if we aren't on the play page

    // 1. Get the Game ID from the URL (e.g., play.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));

    // 2. Find the game in our JSON data
    const games = await fetchGames();
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
    document.title = "Playing " + game.title + " | Save and Load2";
}else {
        playerWrapper.innerHTML = `<h2>Game not found! <a href="index.html">Go Back</a></h2>`;
    }
}

// Start the appropriate logic based on the page
initHomePage();
initPlayPage();
