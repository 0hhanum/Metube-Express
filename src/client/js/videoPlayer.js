const play = document.getElementById("play");
const mute = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
const video = document.querySelector("video");

const handlePlay = (event) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    play.innerText = video.paused ? "play" : "pause";
};

const handleMute = (event) => {

};
play.addEventListener("click", handlePlay);
mute.addEventListener("click", handleMute);