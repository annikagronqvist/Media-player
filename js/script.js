// Your existing song list
const songList = [
    {
        name: "Fade",
        artist: "Alan Walker",
        imageSrc: "bild1.jpg",
        soundSrc: "Alan Walker - Fade.mp3"
    },
    {
        name: "Arc",
        artist: "NCS",
        imageSrc: "bild2.jpg",
        soundSrc: "NCS - Ark.mp3"
    },
    {
        name: "Weapon",
        artist: "M4SONIC",
        imageSrc: "bild3.jpg",
        soundSrc: "M4SONIC - Weapon.mp3"
    },
];

// Step 1: Access the audio player and the play/pause buttons
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

// Step 2: Access song title and artist elements
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

// Function to load the first song
function loadSong() {
    const firstSong = songList[0];
    audioPlayer.src = "audio/" + firstSong.soundSrc;
    songTitle.textContent = firstSong.name;
    songArtist.textContent = firstSong.artist;
}

// Play button functionality
playButton.addEventListener('click', function() {
    audioPlayer.play();
});

// Pause button functionality
pauseButton.addEventListener('click', function() {
    audioPlayer.pause();
});

// Load the first song initially
loadSong();
