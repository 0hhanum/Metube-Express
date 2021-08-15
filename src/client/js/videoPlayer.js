const play = document.getElementById("play");
const mute = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
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

const handleLoadedMetadata = () => {
    totalTime.innerText = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currentTime.innerText = Math.floor(video.currentTime);
}

play.addEventListener("click", handlePlay);
mute.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
// metaData 가 모두 load 되었을 때 실행
video.addEventListener("timeupdate", handleTimeUpdate);

if (video.readyState == 4) {
    handleLoadedMetadata();
}
// eventListener 가 추가되기 전에 video 가 모두 로딩되어 실행이 안될 수 있음.Math
// readyState == 4 는 video 가 충분히 로딩되었음을 뜻함.
