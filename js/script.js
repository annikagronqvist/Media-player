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
const playButton = document.getElementById("play-button"); // Play button icon
const pauseButton = document.getElementById("pause-button"); // Pause button icon

// Load the first song in the list
audioPlayer.src = songList[0].soundSrc;
console.log("Current song source:", audioPlayer.src);

// Play/pause functionality for the play and pause buttons
if (playButton && pauseButton) { // Check if both buttons are found
    playButton.addEventListener("click", function() {
        audioPlayer.play(); // Play audio
        playButton.style.display = "none"; // Hide play button
        pauseButton.style.display = "inline"; // Show pause button
        console.log("Playing audio");
    });

    pauseButton.addEventListener("click", function() {
        audioPlayer.pause(); // Pause audio
        pauseButton.style.display = "none"; // Hide pause button
        playButton.style.display = "inline"; // Show play button
        console.log("Pausing audio");
    });
} else {
    console.error("Play or pause button not found in the HTML.");
}

// Listen for when the audio ends to log that event
audioPlayer.addEventListener("ended", function() {
    console.log("Audio has ended.");
});
