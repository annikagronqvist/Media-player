// Define the song list
const songList = [
    {
        name: "Fade",
        artist: "Alan Walker",
        imageSrc: "img/Walker.jpg",
        soundSrc: "audio/Alan Walker - Fade.mp3"
    },
    {
        name: "Arc",
        artist: "NCS",
        imageSrc: "img/NCS.jpg",
        soundSrc: "audio/NCS - Ark.mp3"
    },
    {
        name: "Weapon",
        artist: "M4SONIC",
        imageSrc: "img/Sonic.jpg",
        soundSrc: "audio/M4SONIC - Weapon.mp3"
    }
];

// Preload images for smooth display
function preloadImages() {
    songList.forEach(song => {
        const img = new Image();
        img.src = song.imageSrc;
    });
}

// Load the playlist items dynamically
function loadPlaylist() {
    const playlistItemsContainer = document.getElementById("playlist-items");
    playlistItemsContainer.innerHTML = ""; // Clear existing playlist
    songList.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.className = "playlist-item";
        songItem.innerText = `${song.name} - ${song.artist}`;
        songItem.style.cursor = "pointer"; // Change cursor to pointer for clarity
        songItem.addEventListener("click", () => {
            currentSongIndex = index; // Set the current song index
            loadCurrentSong(); // Load the selected song
            togglePlay(); // Play the song immediately
        });
        playlistItemsContainer.appendChild(songItem);
    });
}

// Add mute button functionality
const audioPlayer = document.getElementById("audio-player");
const muteButton = document.getElementById("mute-button");
muteButton.addEventListener("click", toggleMute);

function toggleMute() {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // Show "unmuted" icon
    } else {
        audioPlayer.muted = true;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-off"></i>'; // Show "muted" icon
    }
}

// Initial Setup
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementBy
