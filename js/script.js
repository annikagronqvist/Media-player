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

// Select the audio player and play button
const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button"); // Play button icon
const pauseButton = document.getElementById("pause-button"); // Pause button icon
let currentSongIndex = 0; // To keep track of the current song index

// Load the first song in the list
loadCurrentSong(); // Call this function to load the first song when the page loads

// Function to load the current song based on currentSongIndex
function loadCurrentSong() {
    audioPlayer.src = songList[currentSongIndex].soundSrc; // Set audio source
    audioPlayer.play(); // Start playing the audio
    console.log("Now playing:", songList[currentSongIndex].name);
}

// Play/pause functionality for the play button
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Play if paused
        playButton.style.display = "none"; // Hide play button
        pauseButton.style.display = "inline"; // Show pause button
        console.log("Playing audio");
    } else {
        audioPlayer.pause(); // Pause if playing
        playButton.style.display = "inline"; // Show play button
        pauseButton.style.display = "none"; // Hide pause button
        console.log("Pausing audio");
    }
}

// Function to play the previous song
function playPrevious() {
    // Decrement current song index
    currentSongIndex--;

    // If current song index is less than 0, wrap around to the last song
    if (currentSongIndex < 0) {
        currentSongIndex = songList.length - 1; // Go to the last song
    }

    // Load and play the previous song
    loadCurrentSong();
}

// Listen for when the audio ends to log that event
audioPlayer.addEventListener("ended", function() {
    console.log("Audio has ended.");
});

// Play button click event
playButton.addEventListener("click", togglePlay);
pauseButton.addEventListener("click", togglePlay);
