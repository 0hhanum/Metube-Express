export const trending = (req, res) => {
    res.render("home", { "pageTitle": "HOME" });
};
export const watch = (req, res) => {
    res.render("watch", {
        "pageTitle": "Watch"
    });
}
export const edit = (req, res) => {
    res.render("edit", { "pageTitle": "Edit" });
}
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");

// export default 를 하면 한 모듈에서 하나의 변수를 export 하게 됨.
// 위와 같은 방법으로 한 파일에서 여러 개를 export 할 수 있음