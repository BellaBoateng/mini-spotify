// Handle seach behavior within Launch App
const searchBar = document.querySelector(".search-bar");
const songCards = document.querySelectorAll(".song-card");

searchBar.addEventListener("input", function () {
  const searchTerm = searchBar.value.toLowerCase();

  songCards.forEach(function (card) {
    const title = card.querySelector(".song-title").textContent.toLowerCase();
    const artist = card.querySelector(".song-artist").textContent.toLowerCase();

    if (title.includes(searchTerm) || artist.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Handle playlist creation
const createBtn = document.querySelector(".create-playlist-btn");
const playlistInput = document.querySelector(".playlist-name-input");
const playlistList = document.querySelector(".playlist-list");

createBtn.addEventListener("click", function () {
  const name = playlistInput.value.trim();

  if (name === "") {
    alert("Please enter a playlist name");
    return;
  }

  // Create playlist card
  const newPlaylist = document.createElement("div");
  newPlaylist.classList.add("playlist-card");

  newPlaylist.innerHTML = `
    <p class="playlist-name">${name}</p>
    <p class="playlist-count">0 songs</p>
  `;

  playlistList.appendChild(newPlaylist);

  // clear input
  playlistInput.value = "";
});