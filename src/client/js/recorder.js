const startBtn = document.getElementById("startBtn");

// FE 에서 async await 를 사용하려면 regeneratorRuntime 설치해야함.
// client/main.js 에서 import 했음. =>  base.pug 에서 scripts 로 받아오고 있음.

const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    })
    console.log(stream);
}
startBtn.addEventListener("click", handleStart);