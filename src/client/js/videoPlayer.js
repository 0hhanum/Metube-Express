const play = document.getElementById("play");
const mute = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const video = document.querySelector("video");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlay = (event) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    play.innerText = video.paused ? "play" : "pause";
};

const handleMute = (event) => {
    if (video.muted) {
        video.muted = false;
        video.volume = volumeValue;
        volumeRange.value = volumeValue;
    } else {
        video.muted = true;
        volumeRange.value = 0;
    }
    mute.innerText = video.muted ? "Unmute" : "Mute";
};

const handleVolumeChange = (event) => {
    const { target: { value } } = event;
    if (video.muted) {
        video.muted = false;
        mute.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = volumeValue;
}

play.addEventListener("click", handlePlay);
mute.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);