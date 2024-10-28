// Reference to the audio element and play button
const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");

// Song list
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

// Initial song setup
audioPlayer.src = songList[0].soundSrc; // First song in the song list

// Event listener for the play button
playButton.addEventListener("click", function() {
  // Check if audio is already playing
  if (audioPlayer.paused) {
    audioPlayer.play(); // Start playing
  } else {
    audioPlayer.pause(); // If playing, pause the audio
  }
});
