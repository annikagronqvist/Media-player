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

// Log songList to check if paths are correct
console.log(songList);

// Select the audio player and buttons
const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const repeatButton = document.getElementById("repeat-button");
const previousButton = document.getElementById("previous-button");
const volumeControl = document.getElementById("volume-control");

// Set the initial volume (optional)
audioPlayer.volume = 0.5; // Set the initial volume to 50%

// Update the audio player's volume when the volume control is adjusted
volumeControl.addEventListener("input", function() {
    audioPlayer.volume = this.value; // Set the audio player's volume to the slider's value
    console.log("Volume set to:", audioPlayer.volume); // Log the current volume
});

let currentSongIndex = 0; // To keep track of the current song index
let isRepeatOn = false; // To track if repeat is on

// Load the first song in the list
loadCurrentSong(); // Call this function to load the first song when the page loads

// Function to load the current song based on currentSongIndex
function loadCurrentSong() {
    audioPlayer.src = songList[currentSongIndex].soundSrc; // Set audio source
    document.getElementById('song-title').innerText = songList[currentSongIndex].name; // Update song title
    document.getElementById('song-artist').innerText = songList[currentSongIndex].artist; // Update artist name
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

// Listen for when the audio ends to handle repeat functionality
audioPlayer.addEventListener("ended", function() {
    console.log("Audio has ended. Repeat is", isRepeatOn ? "ON" : "OFF");
    if (isRepeatOn) {
        audioPlayer.currentTime = 0; // Reset the song to the beginning
        audioPlayer.play(); // Play the song again
        console.log("Playing the song again due to repeat");
    } else {
        playNext(); // Play the next song if repeat is not on
    }
});

// Update the progress bar as the song plays
audioPlayer.addEventListener('timeupdate', function() {
    const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.getElementById('progress-bar').value = progressPercentage || 0; // Avoid NaN if duration is 0
});

// Allow users to click on the progress bar to seek to a specific time
document.getElementById('progress-bar').addEventListener('
