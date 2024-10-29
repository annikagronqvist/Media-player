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

// Function to format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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
const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const repeatButton = document.getElementById("repeat-button");
const previousButton = document.getElementById("previous-button");
const volumeControl = document.getElementById("volume-control");
audioPlayer.volume = 0.5;

let currentSongIndex = 0;
let isRepeatOn = false;

const playlistLabel = document.getElementById("playlist-label");
const playlistItems = document.getElementById("playlist-items");

playlistLabel.addEventListener("click", function() {
    if (playlistItems.style.display === "none" || playlistItems.style.display === "") {
        playlistItems.style.display = "block"; // Show the playlist
    } else {
        playlistItems.style.display = "none"; // Hide the playlist
    }
});

// Load and play the current song
function loadCurrentSong() {
    const currentSong = songList[currentSongIndex];
    audioPlayer.src = currentSong.soundSrc;
    document.getElementById('song-title').innerText = currentSong.name;
    document.getElementById('song-artist').innerText = currentSong.artist;
    document.getElementById('album-cover').src = currentSong.imageSrc;
    audioPlayer.load(); // Reload audio element with the new source

    // Set total time once the metadata is loaded
    audioPlayer.onloadedmetadata = function() {
        document.getElementById('timer-total').innerText = formatTime(audioPlayer.duration);
    };
}

// Toggle Play/Pause
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            playButton.style.display = "none";
            pauseButton.style.display = "inline";
        }).catch(error => {
            console.error("Error playing audio:", error);
        });
    } else {
        audioPlayer.pause();
        playButton.style.display = "inline";
        pauseButton.style.display = "none";
    }
}

// When the audio ends, either repeat or play the next song
audioPlayer.addEventListener("ended", function() {
    if (isRepeatOn) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        playNext();
    }
});

// Update progress bar during playback
audioPlayer.addEventListener('timeupdate', function() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    // Update the progress bar
    const progressPercentage = (currentTime / duration) * 100;
    document.getElementById('progress-bar').value = progressPercentage || 0;

    // Update the time displays
    document.getElementById('timer-now').innerText = formatTime(currentTime);
});

// Seek functionality
document.getElementById('progress-bar').addEventListener('input', function() {
    const seekTime = (audioPlayer.duration * (this.value / 100));
    audioPlayer.currentTime = seekTime;
});

// Play next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadCurrentSong();
    togglePlay();
}

// Play previous song
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    loadCurrentSong();
    togglePlay();
}

// Shuffle to a random song
function shuffleSong() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songList.length);
    } while (randomIndex === currentSongIndex);
    currentSongIndex = randomIndex;
    loadCurrentSong();
    togglePlay();
}

// Toggle repeat mode
function toggleRepeat() {
    isRepeatOn = !isRepeatOn;
    repeatButton.style.color = isRepeatOn ? "green" : "";
}

// Attach event listeners to buttons
playButton.addEventListener("click", togglePlay);
pauseButton.addEventListener("click", togglePlay);
repeatButton.addEventListener("click", toggleRepeat);
previousButton.addEventListener("click", playPrevious);
volumeControl.addEventListener("input", function() {
    audioPlayer.volume = this.value;
});

// Initialize the playlist and preload images
loadPlaylist();
preloadImages();
loadCurrentSong();
