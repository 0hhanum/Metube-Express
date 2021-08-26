const videoContainer = document.getElementById("videoContainer");
const containerBox = document.getElementsByClassName("container-box")[0];
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const delBtns = document.getElementsByClassName("del");

const user = containerBox.dataset.username;

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.commentid = id;
    const commentOwner = document.createElement("span");
    const commentText = document.createElement("span");
    let delBtn;
    commentText.innerText = text;
    if (user) {
        commentOwner.innerText = user;
        delBtn = document.createElement("span");
        delBtn.innerText = "삭제";
        delBtn.className = "del";
        delBtn.addEventListener("click", handleDelete);

    } else {
        commentOwner.innerText = "익명";
    }
    newComment.appendChild(commentText);
    newComment.appendChild(commentOwner);
    newComment.appendChild(delBtn);
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
    const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
    });
    // 서버는 js object 이해할 수 없음. stringify 이용해 json 문자열로 변경 후 전송
    // 헤더에 json 보낸다 명시 -> server.js 에서 json() 사용했기에 req.body 에서 js object 로 parse 된 object 사용 가능.
    // status code 와 함께 보낸 json 받아오기.
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    };
}

const handleKeydown = (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        handleSubmit(e);
    }
}

const handleDelete = async (e) => {
    const commentBox = e.target.parentElement;
    const commentId = commentBox.dataset.commentid;
    const response = await fetch("/api/del-comment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId })
    });

    if (response.status === 200) {
        console.log(commentBox);
        commentBox.remove();
    };
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keypress", handleKeydown);

for (let i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", handleDelete);
};
