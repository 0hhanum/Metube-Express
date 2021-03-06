const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const textarea = document.querySelector("textarea");


let controlsTimeOut = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlay = (event) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-hamburger fa-2xl";
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
    muteBtnIcon.classList = video.muted
        ? "fas fa-volume-mute"
        : "fas fa-volume-up";
};

const handleVolumeChange = (event) => {
    const { target: { value } } = event;
    if (video.muted) {
        video.muted = false;
        muteBtnIcon.classList = "fas fa-volume-up";
    }
    volumeValue = value;
    video.volume = volumeValue;
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5);
// seconds 에 영상 길이를 넣으면 --:-- 형식의 date 객체를 반환하는 hack.

const handleLoadedMetadata = async () => {
    await video.readyState === 4;
    if (video.duration == Infinity) {
        video.currentTime = 1e101;
        video.ontimeupdate = function () {
            this.ontimeupdate = () => {
                return;
            }
            video.currentTime = 0;
            return;
        }
    }
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

const handleFullScreen = () => {
    const fullscreen = document.fullscreenElement;

    if (fullscreen) {
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
}


const hideControls = () => videoControls.classList.remove("showing");
const handleMouseMove = () => {
    if (controlsTimeOut) {
        clearTimeout(controlsTimeOut);
        controlsTimeOut = null;
        // 나갔다 다시 들어와 timeout 이 실행되고 있다면 종료시킨다.
    }
    videoControls.classList.add("showing");
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    // 마우스가 플레이어 위에서 2000ms 동안 가만히 있으면 controls 를 없애는 코드 
    controlsMovementTimeout = setTimeout(hideControls, 1200);

}
const handleMouseLeave = () => {
    controlsTimeOut = setTimeout(hideControls, 1000);
    // 3000ms 후에 실행
    // 마우스가 들어갔다 나왔다 다시 들어갔을 때 실행되고 있는 timeout 을 끄기 위한 변수
}

const handleKeydown = (event) => {
    if (event.target !== textarea) {
        if (event.key === " ") {
            event.preventDefault();
            handlePlay();
        }
        if (event.key === "m") {
            handleMute();
        }
    }
}


const handleEnded = () => {
    const { videoid } = videoContainer.dataset;
    fetch(`/api/videos/${videoid}/view`, {
        method: "POST",
    });
}

////////////////////////////////////////////
playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
// metaData 가 모두 load 되었을 때 실행
video.addEventListener("timeupdate", handleTimeUpdate);
// 현재 비디오의 재생 구간이 변할 때마다 실행
timeline.addEventListener("input", handleTimeline);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown", handleKeydown);
video.addEventListener("click", handlePlay);
video.addEventListener("ended", handleEnded);

//////////////////////////////////////////////////////
if (video.readyState === 4) {
    handleLoadedMetadata();
}
// eventListener 가 추가되기 전에 video 가 모두 로딩되어 실행이 안될 수 있음.Math
// readyState == 4 는 video 가 충분히 로딩되었음을 뜻함.
