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
const pauseButton = document.querySelector(".fa-pause"); // Pause button icon
const songTitleDisplay = document.getElementById("song-title");
const songArtistDisplay = document.getElementById("song-artist");

// Load the first song in the list
audioPlayer.src = songList[0].soundSrc;
songTitleDisplay.textContent = songList[0].name; // Set the title
songArtistDisplay.textContent = songList[0].artist; // Set the artist
console.log("Current song source:", audioPlayer.src);

// Play/pause functionality for the play button
if (playButton) {
    playButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play(); // Play if paused
            console.log("Playing audio");
            playButton.style.display = "none"; // Hide play button
            pauseButton.style.display = "inline"; // Show pause button
        } else {
            audioPlayer.pause(); // Pause if playing
            console.log("Pausing audio");
            pauseButton.style.display = "none"; // Hide pause button
            playButton.style.display = "inline"; // Show play button
        }
    });
} else {
    console.error("Play button not found in the HTML.");
}

// Listen for when the audio ends to log that event
audioPlayer.addEventListener("ended", function() {
    console.log("Audio has ended.");
    playButton.style.display = "inline"; // Show play button again
    pauseButton.style.display = "none"; // Hide pause button
});
