<!DOCTYPE html>
<html>
<head>
    <title>Programmering - Audio Player</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script defer src="js/script.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <audio id="audio-player">
        <source src="" type="audio/mpeg">
    </audio>

    <div id="wrapper">
        <div id="player-area" class="text-center">
            <div class="content-row now-playing p-20">
                <span class="heading-text">Now Playing</span>
            </div>

            <div class="content-row">
                <div id="song-info" class="flex-row">
                    <span id="song-title" class="song-detail"></span>
                    <span id="song-artist" class="song-detail"></span>
                </div>
            </div>

            <div class="content-row flex-center">
                <img src="" id="album-cover" class="responsive-img" alt="Cover image">
            </div>

            <div class="content-row">
                <span id="timer-now">0:00</span>            
                <input type="range" class="width-100" id="progress-bar" min="0" max="100" step="1" value="0">
                <span id="timer-total">0:00</span>
            </div>

            <div class="content-row icon-row p-20">
                <i class="fa-solid fa-arrow-rotate-right" id="repeat-button"></i>
                <i class="fa-solid fa-backward-step" id="previous-button"></i>
                <span class="play-pause-container">
                    <i class="fa-solid fa-play" id="play-button"></i>
                    <i class="fa-solid fa-pause" id="pause-button" style="display: none;"></i>
                </span>
                <i class="fa-solid fa-forward-step" onclick="playNext()"></i>
                <i class="fa-solid fa-shuffle" onclick="shuffleSong()"></i>
            </div>

            <div class="content-row">
                <input type="range" id="volume-control" min="0" max="1" step="0.01">
            </div>

            <div id="playlist">
    <div class="content-row p-20 flex-center">
        <span class="playlist-item">Playlist:</span>
    </div>
    <div id="playlist-items">
        <!-- Playlist items will be generated here -->
    </div>
</div>
        </div>
    </div>
</body>
</html>
