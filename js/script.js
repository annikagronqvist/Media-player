// Song list array
const songList = [
    {
        name: "Fade",
        artist: "Alan Walker",
        imageSrc: "img/Walker.jpg", // Ensure the image path is correct
        soundSrc: "audio/Alan Walker - Fade.mp3"
    },
    {
        name: "Arc",
        artist: "NCS",
        imageSrc: "img/NCS.jpg", // Ensure the image path is correct
        soundSrc: "audio/NCS - Ark.mp3"
    },
    {
        name: "Weapon",
        artist: "M4SONIC",
        imageSrc: "img/Sonic.jpg", // Ensure the image path is correct
        soundSrc: "audio/M4SONIC - Weapon.mp3"
    }
];

// Preload images
function preloadImages() {
    songList.forEach(song => {
        const img = new Image();
        img.src = song.imageSrc; // Preload each image
    });
}

// Load the playlist dynamically
const playlistItemsContainer = document.getElementById("playlist-items");

function loadPlaylist() {
    songList.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.className = "playlist-item";
        songItem.innerText = `${song.name} - ${song.artist}`;
        
        // Optional: Add click event to play the selected song
        songItem.addEventListener("click", () => {
            currentSongIndex = index; // Set the current song index to the clicked song
            loadCurrentSong(); // Load and play the selected song
        });
        
        playlistItemsContainer.appendChild(songItem);
    });
}

// Call loadPlaylist and preloadImages after the songList is defined
loadPlaylist();
preloadImages();

// Select the audio player and buttons
const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const repeatButton = document.getElementById("repeat-button");
const previousButton = document.getElementById("previous-button"); // Added for previous button
const volumeControl = document.getElementById("volume-control");

// Set the initial volume (optional)
audioPlayer.volume = 0.5; // Set the initial volume to 50%

// Load the first song in the list
let currentSongIndex = 0;
let isRepeatOn = false;

// Load the current song details and play
function loadCurrentSong() {
    const currentSong = songList[currentSongIndex];
    audioPlayer.src = currentSong.soundSrc; // Set audio source
    document.getElementById('song-title').innerText = currentSong.name; // Update song title
    document.getElementById('song-artist').innerText = currentSong.artist; // Update artist name
    document.getElementById('album-cover').src = currentSong.imageSrc; // Update album cover
    audioPlayer.play(); // Start playing the audio
    console.log("Now playing:", currentSong.name);
}

// Play/pause functionality for the play button
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.style.display = "none";
        pauseButton.style.display = "inline";
        console.log("Playing audio");
    } else {
        audioPlayer.pause();
        playButton.style.display = "inline";
        pauseButton.style.display = "none";
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
document.getElementById('progress-bar').addEventListener('input', function() {
    const seekTime = (audioPlayer.duration * (this.value / 100));
    audioPlayer.currentTime = seekTime;
});

// Function to play the next song
function playNext() {
    currentSongIndex++;
    if (currentSongIndex >= songList.length) {
        currentSongIndex = 0; // Go back to the first song if at the end
    }
    loadCurrentSong(); // Load the new song
}

// Function to play the previous song
function playPrevious() {
    currentSongIndex--; // Decrease the current song index
    if (currentSongIndex < 0) {
        currentSongIndex = songList.length - 1; // Wrap around to the last song
    }
    loadCurrentSong(); // Load the new song
}

// Shuffle song function
function shuffleSong() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songList.length);
    } while (randomIndex === currentSongIndex);
    currentSongIndex = randomIndex;
    loadCurrentSong();
}

// Function to toggle repeat mode
function toggleRepeat() {
    console.log("Toggle repeat called"); // Log when the function is called
    isRepeatOn = !isRepeatOn; // Toggle repeat mode
    console.log("Repeat is now", isRepeatOn ? "ON" : "OFF");

    // Change the appearance of the repeat button based on its state
    repeatButton.style.color = isRepeatOn ? "green" : ""; // Change color to indicate active state
}

// Attach event listeners for buttons
playButton.addEventListener("click", togglePlay);
pauseButton.addEventListener("click", togglePlay);
repeatButton.addEventListener("click", toggleRepeat);
previousButton.addEventListener("click", playPrevious); // Attach event listener to the previous button
