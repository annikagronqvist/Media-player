// Song list array
const songList = [
    {
        name: "Fade",
        artist: "Alan Walker",
        imageSrc: "bild1.jpg",
        soundSrc: "audio/Alan Walker - Fade.mp3"
    },
    {
        name: "Arc",
        artist: "NCS",
        imageSrc: "bild2.jpg",
        soundSrc: "audio/NCS - Ark.mp3"
    },
    {
        name: "Weapon",
        artist: "M4SONIC",
        imageSrc: "bild3.jpg",
        soundSrc: "audio/M4SONIC - Weapon.mp3"
    }
];

// Select the audio player and buttons
const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const repeatButton = document.getElementById("repeat-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const volumeControl = document.getElementById("volume-control");

// Set the initial volume (optional)
audioPlayer.volume = 0.5; // Set the initial volume to 50%

// Update the audio player's volume when the volume control is adjusted
volumeControl.addEventListener("input", function() {
    audioPlayer.volume = this.value; // Set the audio player's volume to the slider's value
});

// Load the first song in the list
let currentSongIndex = 0; // To keep track of the current song index
loadCurrentSong(); // Call this function to load the first song when the page loads

// Function to load the current song based on currentSongIndex
function loadCurrentSong() {
    audioPlayer.src = songList[currentSongIndex].soundSrc; // Set audio source
    document.getElementById('song-title').innerText = songList[currentSongIndex].name; // Update song title
    document.getElementById('song-artist').innerText = songList[currentSongIndex].artist; // Update artist name
}

// Play/pause functionality for the play button
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Play if paused
        playButton.style.display = "none"; // Hide play button
        pauseButton.style.display = "inline"; // Show pause button
    } else {
        audioPlayer.pause(); // Pause if playing
        playButton.style.display = "inline"; // Show play button
        pauseButton.style.display = "none"; // Hide pause button
    }
}

// Handle when the audio ends
audioPlayer.addEventListener("ended", function() {
    playNext(); // Automatically play the next song
});

// Function to play the next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songList.length; // Loop back to the first song if at the end
    loadCurrentSong();
    togglePlay();
}

// Function to play the previous song
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length; // Loop back to the last song if at the beginning
    loadCurrentSong();
    togglePlay();
}

// Optional: Shuffle song functionality
function shuffleSong() {
    // Implement shuffle logic if needed
}
