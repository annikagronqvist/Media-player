// Define the song list
const songList = [
    {
        name: "Fade",
        artist: "Alan Walker",
        imageSrc: "img/Walker.jpg",
        soundSrc: "audio/Alan Walker - Fade.mp3",
        liked: false // Ensure this is added correctly
    },
    {
        name: "Arc",
        artist: "NCS",
        imageSrc: "img/NCS.jpg",
        soundSrc: "audio/NCS - Ark.mp3",
        liked: false // Ensure this is added correctly
    },
    {
        name: "Weapon",
        artist: "M4SONIC",
        imageSrc: "img/Sonic.jpg",
        soundSrc: "audio/M4SONIC - Weapon.mp3",
        liked: false // Ensure this is added correctly
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

// Function to format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`; // Format as MM:SS
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

// Load and play the current song
function loadCurrentSong() {
    const currentSong = songList[currentSongIndex]; // Get the current song
    audioPlayer.src = currentSong.soundSrc; // Set the audio source
    document.getElementById('song-title').innerText = currentSong.name; // Update song title
    document.getElementById('song-artist').innerText = currentSong.artist; // Update artist name
    document.getElementById('album-cover').src = currentSong.imageSrc; // Update album cover
    audioPlayer.load(); // Reload audio element with the new source

    // Initialize time display
    document.getElementById('timer-now').innerText = '0:00'; // Start time
    document.getElementById('timer-total').innerText = formatTime(audioPlayer.duration); // Update total time

    // Set the like button state based on the current song's liked status
    const likeButton = document.querySelector('.like-button');
    likeButton.classList.toggle('liked', currentSong.liked); // Update class based on liked status
    likeButton.querySelector('i').style.color = currentSong.liked ? 'red' : 'black'; // Set the color accordingly
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

// Update progress bar and time display during playback
audioPlayer.addEventListener('timeupdate', function() {
    const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.getElementById('progress-bar').value = progressPercentage || 0;

    // Update the time display
    const currentTime = formatTime(audioPlayer.currentTime);
    const totalTime = formatTime(audioPlayer.duration);
    document.getElementById('timer-now').innerText = currentTime;
    document.getElementById('timer-total').innerText = totalTime;
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

// Function to toggle the visibility of the playlist
function togglePlaylist() {
    const playlistItems = document.getElementById("playlist-items");
    if (playlistItems.style.display === "none" || playlistItems.style.display === "") {
        playlistItems.style.display = "block"; // Show the playlist
    } else {
        playlistItems.style.display = "none"; // Hide the playlist
    }
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

function toggleMute() {
    const audioPlayer = document.getElementById("audio-player");
    const muteButtonIcon = document.querySelector(".mute-button i");

    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        muteButtonIcon.classList.remove("fa-volume-xmark"); // Mute icon
        muteButtonIcon.classList.add("fa-volume-up"); // Unmute icon
    } else {
        audioPlayer.muted = true;
        muteButtonIcon.classList.remove("fa-volume-up"); // Unmute icon
        muteButtonIcon.classList.add("fa-volume-xmark"); // Mute icon
    }
}

function toggleLike() {
    const likeButton = document.querySelector('.like-button');
    const currentSong = songList[currentSongIndex]; // Get the current song

    // Toggle the "liked" state
    currentSong.liked = !currentSong.liked;

    // Change the button state visually
    if (currentSong.liked) {
        likeButton.classList.add('liked'); // Add "liked" class
        likeButton.querySelector('i').style.color = 'red'; // Change to red
        console.log("Liked!");
    } else {
        likeButton.classList.remove('liked'); // Remove "liked" class
        likeButton.querySelector('i').style.color = 'black'; // Change back to default
        console.log("Unliked!");
    }
}
