// Storage
let playlists = JSON.parse(localStorage.getItem("playlists")) || {
    "Afrobeats Mix": [
        { title: "In Fact", artist: "Gabzy" },
        { title: "On the Low", artist: "Burna Boy" }
    ],
    "Late Night": [
        { title: "Free Mind", artist: "Tems" }
    ],
    "Study Vibes": []
};

function savePlaylists() {
    localStorage.setItem("playlists", JSON.stringify(playlists));
}

// Search behavior
const searchBar = document.querySelector(".search-bar");
const songCards = document.querySelectorAll(".song-card");

if (searchBar) {
    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();

        songCards.forEach(function (card) {
            const title = card.querySelector(".song-title").textContent.toLowerCase();
            const artist = card.querySelector(".song-artist").textContent.toLowerCase();

            if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Playlist creation
const createBtn = document.querySelector(".create-playlist-btn");
const playlistInput = document.querySelector(".playlist-name-input");
const playlistList = document.querySelector(".playlist-list");

function createPlaylistCard(name) {
    const playlistCard = document.createElement("div");
    playlistCard.classList.add("playlist-card");

    playlistCard.innerHTML = `
    <p class="playlist-name">${name}</p>
    <p class="playlist-count">${playlists[name].length} ${playlists[name].length === 1 ? "song" : "songs"
        }</p>
  `;

    playlistCard.addEventListener("click", function () {
        selectPlaylist(playlistCard);
    });

    playlistList.appendChild(playlistCard);
}

if (playlistList) {
    playlistList.innerHTML = "";

    for (let name in playlists) {
        createPlaylistCard(name);
    }
}

if (createBtn) {
    createBtn.addEventListener("click", function () {
        const name = playlistInput.value.trim();

        if (name === "") {
            alert("Please enter a playlist name");
            return;
        }

        if (playlists[name]) {
            alert("That playlist already exists");
            return;
        }

        playlists[name] = [];
        savePlaylists();

        createPlaylistCard(name);

        playlistInput.value = "";
    });
}

// Add song to playlist
let currentPlaylist = null;

function selectPlaylist(card) {
    currentPlaylist = card;

    document.querySelectorAll(".playlist-card").forEach(function (playlist) {
        playlist.classList.remove("selected-playlist");
    });

    card.classList.add("selected-playlist");
}

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        if (!currentPlaylist) {
            alert("Select a playlist first!");
            return;
        }

        const songCard = btn.parentElement;
        const title = songCard.querySelector(".song-title").textContent;
        const artist = songCard.querySelector(".song-artist").textContent;
        const playlistName = currentPlaylist.querySelector(".playlist-name").textContent;

        playlists[playlistName].push({
            title: title,
            artist: artist
        });

        savePlaylists();

        const countText = currentPlaylist.querySelector(".playlist-count");
        const count = playlists[playlistName].length;

        countText.textContent = count === 1 ? "1 song" : count + " songs";
    });
});

// Display saved playlists on playlists.html
const savedPlaylistsContainer = document.querySelector("#saved-playlists-container");

if (savedPlaylistsContainer) {
    savedPlaylistsContainer.innerHTML = "";

    for (let playlistName in playlists) {
        const playlistCard = document.createElement("div");
        playlistCard.classList.add("playlist-detail-card");

        let songsHTML = "";

        if (playlists[playlistName].length === 0) {
            songsHTML = `<p class="empty-note">No songs added yet.</p>`;
        } else {
            playlists[playlistName].forEach(function (song) {
                songsHTML += `
          <div class="playlist-song">
            <span>${song.title}</span>
            <small>${song.artist}</small>
          </div>
        `;
            });
        }

        playlistCard.innerHTML = `
      <h2>${playlistName}</h2>
      <p class="playlist-count">
        ${playlists[playlistName].length} ${playlists[playlistName].length === 1 ? "song" : "songs"
            }
      </p>
      ${songsHTML}
    `;

        savedPlaylistsContainer.appendChild(playlistCard);
    }
}