const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

// FE 에서 async await 를 사용하려면 regeneratorRuntime 설치해야함.
// client/main.js 에서 import 했음. =>  base.pug 에서 scripts 로 받아오고 있음.
const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    })
    video.srcObject = stream;
    video.play();
}


startBtn.addEventListener("click", handleStart);