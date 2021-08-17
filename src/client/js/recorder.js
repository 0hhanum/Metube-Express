import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const downloadBtn = document.getElementById("downloadBtn");
const video = document.getElementById("preview");

// FE 에서 async await 를 사용하려면 regeneratorRuntime 설치해야함.
// client/main.js 에서 import 했음. =>  base.pug 에서 scripts 로 받아오고 있음.

let stream;
// 함수 간 stream 을 공유하기 위해 비어있는 변수 만들기.
let recorder;
let videoFile;

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    })
    video.srcObject = stream;
    video.play();
}

const handleDownload = async () => {
    // 원래는 FFmpeg 를 BE 즉, 서버에서 돌려야함. 지금 하는 건 사용자의 브라우저를 이용해 FE 에서 사용하려 함.
    const ffmpeg = createFFmpeg({
        log: true,
        corePath: "/ffmpeg/ffmpeg-core.js"
    });
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    // ffmpeg 가상공간에  fetchFile 을 이용해 "recording.webm" File 을 생성.
    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
    // "recording.webm" 파일을 -input 하고 60 frame/sec 로 인코딩.
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
};
// HTML anchor 를 이용해 다운로드하기. webm 은 확장자.
// a 에 "download" property 를 부여하면 해당 링크는 어디로 향하는 게 아니라 download 가 됨.


const handleStop = () => {
    startBtn.innerText = "다시 녹화";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);
    downloadBtn.className = "showing"
    recorder.stop();
}

const handleStart = () => {
    startBtn.innerText = "녹화 중지";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    init();
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        // 이 url 은 브라우저 메모리에만 존재. 실제로는 X
        video.srcObject = null;
        // srcObject 에서 실제 file 의 src 로 변경
        video.src = videoFile;
        video.play();
        video.loop = true;
    };
    // recorder 의 start 메소드가 완료되었을 때 발생하는 event 
    // 위 라인은 console.log(recorder.ondataavailable) 과 동일한듯.   
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 10000);
}


init();
startBtn.addEventListener("click", handleStart);
downloadBtn.addEventListener("click", handleDownload);