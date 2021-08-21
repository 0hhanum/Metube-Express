const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const handleSubmit = (e) => {
    e.preventDefault();
    const text = textarea.value;
    const video = videoContainer.dataset.videoid;
}

form.addEventListener("submit", handleSubmit);