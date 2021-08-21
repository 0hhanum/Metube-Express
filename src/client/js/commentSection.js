const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const handleSubmit = (e) => {
    e.preventDefault();
    const text = textarea.value;
    const videoId = videoContainer.dataset.videoid;
    if (text === "") {
        return
    };
    fetch(`/api/videos/${videoId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
    });
    // 서버는 js object 이해할 수 없음. json 문자열로 변경 후 전송.
    // 헤더에 json 보낸다 명시 -> server.js 에서 json() 사용했기에 다시 js object 로 parse 해줌.
}

form.addEventListener("submit", handleSubmit);