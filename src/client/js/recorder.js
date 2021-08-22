import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const downloadBtn = document.getElementById("downloadBtn");
const video = document.getElementById("preview");
const notices = document.getElementsByClassName("notice");
const waiting = document.getElementById("waiting");


// FE 에서 async await 를 사용하려면 regeneratorRuntime 설치해야함.
// client/main.js 에서 import 했음. =>  base.pug 에서 scripts 로 받아오고 있음.

let stream;
// 함수 간 stream 을 공유하기 위해 비어있는 변수 만들기.
let recorder;
let videoFile;

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
}

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
}
// HTML anchor 를 이용해 다운로드하기. 
// a 에 "download" property 를 부여하면 해당 링크는 어디로 향하는 게 아니라 download 가 됨.

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
    alert("시간이 걸리니 가만히 기다리세요.");
    downloadBtn.disabled = true;

    for (const notice of notices) {
        notice.classList.add("hide");
    }
    waiting.className = "showing";
    const ffmpeg = createFFmpeg({
        log: true,
        corePath: "/ffmpeg/ffmpeg-core.js"
    });
    await ffmpeg.load();
    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
    // ffmpeg 가상공간에  fetchFile 을 이용해 "recording.webm" File 을 생성.
    await ffmpeg.run("-i", files.input, "-r", "60", files.output);
    // "recording.webm" 파일을 -input 하고 60 frame/sec 로 인코딩.
    await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb);
    // -ss 커맨드는 영상의 특정 시점으로 이동, -frames:v, 1 => 1 프레임의 스크린샷 저장
    const ConvertedMP4 = ffmpeg.FS("readFile", files.output);
    const thumbFile = ffmpeg.FS("readFile", files.thumb);
    // 인코딩된 파일을 ffmpeg 가상 공간에서 filesystem FS 를 이용해 가져옴. 

    const mp4Blob = new Blob([ConvertedMP4.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
    // 이는 숫자로만 이루어진 data(Unit8Array) 이기 때문에 File 로 변환해줘야함. blob 이용.

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url, "MyRecording.mp4");
    downloadFile(thumbUrl, "MyThumbnail.jpg");

    // var form = document.createElement("form");
    // form.setAttribute("charset", "UTF-8");
    // form.setAttribute("method", "Post");
    // form.setAttribute("action", "/videos/upload");
    // var hiddenField = document.createElement("input");
    // hiddenField.setAttribute("type", "hidden");
    // hiddenField.setAttribute("name", "videoFile");
    // hiddenField.setAttribute("value", mp4Url);
    // form.appendChild(hiddenField);
    // hiddenField = document.createElement("input");
    // hiddenField.setAttribute("type", "hidden");
    // hiddenField.setAttribute("name", "thumbFile");
    // hiddenField.setAttribute("value", thumbUrl);
    // form.appendChild(hiddenField);
    // document.body.appendChild(form);
    // form.submit();
    // await fetch("/videos/upload", {
    //     method: "POST",
    //     headers: { "Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD" },
    //     body: file
    // })
    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(videoFile);
    // 브라우저 속도를 위해 ffmpeg 이용해 만든 메모리 내의 가상 url 및 파일을 삭제.
};


const handleStop = () => {
    startBtn.innerText = "다시 녹화";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);
    downloadBtn.className = "showing"
    if (downloadBtn.disabled === true) {
        downloadBtn.disabled = false;
    };
    recorder.stop();
}

const handleStart = () => {
    for (const notice of notices) {
        notice.classList.remove("hide");
    }
    waiting.className = "";
    startBtn.innerText = "녹화 중지";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    init();
    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
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
    }, 8000);
}


init();
startBtn.addEventListener("click", handleStart);
downloadBtn.addEventListener("click", handleDownload);