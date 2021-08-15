const play = document.getElementById("play");
const mute = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const video = document.querySelector("video");
const timeline = document.getElementById("timeline");


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

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5);
// seconds 에 영상 길이를 넣으면 --:-- 형식의 date 객체를 반환하는 hack.

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}

const handleTimeline = (event) => {
    video.currentTime = event.target.value;
}

play.addEventListener("click", handlePlay);
mute.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
// metaData 가 모두 load 되었을 때 실행
video.addEventListener("timeupdate", handleTimeUpdate);
// 현재 비디오의 재생 구간이 변할 때마다 실행
timeline.addEventListener("input", handleTimeline);


//////////////////////////////////////////////////////
if (video.readyState == 4) {
    handleLoadedMetadata();
}
// eventListener 가 추가되기 전에 video 가 모두 로딩되어 실행이 안될 수 있음.Math
// readyState == 4 는 video 가 충분히 로딩되었음을 뜻함.
