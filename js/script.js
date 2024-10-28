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

// Select the audio player and play/pause buttons
const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button"); // Play button
const pauseButton = document.getElementById("pause-button"); // Pause button

// Load the first song in the list
audioPlayer.src = songList[0].soundSrc;
console.log("Current song source:", audioPlayer.src);

// Play/pause functionality for the play button
if (playButton && pauseButton) { // Ensure both buttons are selected
    playButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play(); // Play if paused
            console.log("Playing audio");
            playButton.style.display = "none"; // Hide play icon
            pauseButton.style.display = "inline"; // Show pause icon
        }
    });

    pauseButton.addEventListener("click", function() {
        if (!audioPlayer.paused) {
            audioPlayer.pause(); // Pause if playing
            console.log("Pausing audio");
            playButton.style.display = "inline"; // Show play icon
            pauseButton.style.display = "none"; // Hide pause icon
        }
    });
} else {
    console.error("Play or pause button not found in the HTML.");
}

// Listen for when the audio ends to log that event
audioPlayer.addEventListener("ended", function() {
    console.log("Audio has ended.");
    playButton.style.display = "inline"; // Show play icon when audio ends
    pauseButton.style.display = "none"; // Hide pause icon when audio ends
});
