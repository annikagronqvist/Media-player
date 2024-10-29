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

// Select the audio player and play button
const audioPlayer = document.getElementById("audio-player");
// Repeat mode variable
let isRepeatOn = false;

// Function to toggle repeat mode
function toggleRepeat() {
    isRepeatOn = !isRepeatOn; // Toggle repeat mode
    console.log("Repeat is now", isRepeatOn ? "ON" : "OFF");
}

// Listen for when the audio ends to handle repeat functionality
audioPlayer.addEventListener("ended", function() {
    if (isRepeatOn) {
        audioPlayer.currentTime = 0; // Reset the song to the beginning
        audioPlayer.play(); // Play the song again
    } else {
        playNext(); // Play the next song if repeat is not on
    }
});
const playButton = document.getElementById("play-button"); // Play button icon
const pauseButton = document.getElementById("pause-button"); // Pause button icon
let currentSongIndex = 0; // To keep track of the current song index
let isRepeatOn = false; // To track if repeat is on

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

// Update the progress bar as the song plays
audioPlayer.addEventListener('timeupdate', function() {
    const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.getElementById('progress-bar').value = progressPercentage || 0; // Avoid NaN if duration is 0
});

// Allow users to click on the progress bar to seek to a specific time
document.getElementById('progress-bar').addEventListener('input', function() {
    const seekTime = (audioPlayer.duration * (this.value / 100));
    audioPlayer.currentTime = seekTime; // Set the audio player's current time
});

// Function to play the next song
function playNext() {
    currentSongIndex++; // Move to the next song
    if (currentSongIndex >= songList.length) {
        currentSongIndex = 0; // Go back to the first song if at the end
    }
    loadCurrentSong(); // Load the new song
}

// Listen for when the audio ends to handle repeat functionality
audioPlayer.addEventListener("ended", function() {
    if (isRepeatOn) {
        audioPlayer.currentTime = 0; // Reset the song to the beginning
        audioPlayer.play(); // Play the song again
    } else {
        playNext(); // Play the next song if repeat is not on
    }
});

// Shuffle song function
function shuffleSong() {
    // Generate a random index that’s different from the current song index
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songList.length);
    } while (randomIndex === currentSongIndex);

    // Set the new current song index and load the new song
    currentSongIndex = randomIndex;
    loadCurrentSong();

    // Check if the player is paused, then play and update icons accordingly
    if (audioPlayer.paused) {
        // If audio is paused, play it and update icons
        audioPlayer.play();
        playButton.style.display = "none"; // Hide play button
        pauseButton.style.display = "inline"; // Show pause button
    } else {
        // If audio is already playing, reload the song and make sure icons are correct
        playButton.style.display = "none"; // Hide play button
        pauseButton.style.display = "inline"; // Show pause button
    }

    console.log("Shuffled to song:", songList[currentSongIndex].name);
}

// Repeat mode variable
function toggleRepeat() {
    isRepeatOn = !isRepeatOn; // Toggle repeat mode
    console.log("Repeat is now", isRepeatOn ? "ON" : "OFF");
}

// Play button click event
playButton.addEventListener("click", togglePlay);
pauseButton.addEventListener("click", togglePlay);
