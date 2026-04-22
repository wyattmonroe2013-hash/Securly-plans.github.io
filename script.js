async function loadGames() {
    const response = await fetch('games.json');
    const games = await response.json();
    displayGames(games);
}

function displayGames(gameList) {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; // Clear existing content

    gameList.forEach(game => {
        const gameCard = `
            <div class="game-card">
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>${game.category}</p>
                <a href="play.html?id=${game.id}">Play Now</a>
            </div>
        `;
        container.innerHTML += gameCard;
    });
}

loadGames();
