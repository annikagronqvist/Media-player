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
const playButton = document.querySelector(".fa-play"); // Play button icon
let currentSongIndex = 0; // Track the currently playing song index

// Load the first song in the list
audioPlayer.src = songList[currentSongIndex].soundSrc;
console.log("Current song source:", audioPlayer.src);

// Play/pause functionality for the play button
if (playButton) { // Only if playButton is successfully selected
    playButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play(); // Play if paused
            console.log("Playing audio");
        } else {
            audioPlayer.pause(); // Pause if playing
            console.log("Pausing audio");
        }
    });
} else {
    console.error("Play button not found in the HTML.");
}

// Function to play the previous song
function playPrevious() {
    // Decrease the index by 1
    currentSongIndex--;

    // If the index is less than 0, wrap around to the last song
    if (currentSongIndex < 0) {
        currentSongIndex = songList.length - 1; // Go to last song
    }

    // Load and play the previous song
    audioPlayer.src = songList[currentSongIndex].soundSrc;
    audioPlayer.play();
    console.log("Playing previous song:", songList[currentSongIndex].name);
}

// Listen for when the audio ends to log that event
audioPlayer.addEventListener("ended", function() {
    console.log("Audio has ended.");
});
