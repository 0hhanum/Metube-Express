const videoContainer = document.getElementById("videoContainer");
const containerBox = document.getElementsByClassName("container-box")[0];
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const user = containerBox.dataset.username;

const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    const commentOwner = document.createElement("span");
    const commentText = document.createElement("span");
    commentText.innerText = text;
    if (user) {
        commentOwner.innerText = user;
    } else {
        commentOwner.innerText = "익명";
    }
    newComment.appendChild(commentText);
    newComment.appendChild(commentOwner);
    newComment.className = "video__comment";
    commentText.className = "comment__text"
    videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const text = textarea.value;
    const videoId = videoContainer.dataset.videoid;
    if (text === "") {
        return
    };
    const { status } = await fetch(`/api/videos/${videoId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
    });
    // 서버는 js object 이해할 수 없음. stringify 이용해 json 문자열로 변경 후 전송
    // 헤더에 json 보낸다 명시 -> server.js 에서 json() 사용했기에 req.body 에서 js object 로 parse 된 object 사용 가능.
    textarea.value = "";
    if (status === 201) {
        addComment(text);
    };
}

const handleKeydown = (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        handleSubmit(e);
    }
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("keypress", handleKeydown);