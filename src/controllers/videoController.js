let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 40,
        id: 1
    },
    {
        title: "Second Video",
        rating: 3,
        comments: 12,
        createdAt: "1 minutes ago",
        views: 30,
        id: 2
    },
    {
        title: "Third Video",
        rating: 1,
        comments: 1,
        createdAt: "5 minutes ago",
        views: 1,
        id: 3
    },
];

export const trending = (req, res) => {
    return res.render("home", { "pageTitle": "HOME", videos });
};

export const watch = (req, res) => {
    const { id } = req.params
    // ES6 문법. const id = req.params.id 와 동일 
    const video = videos[id - 1]

    return res.render("watch", {
        pageTitle: `Watching: ${video.title}`,
        video: video
    });
}

export const getEdit = (req, res) => {
    const { id } = req.params
    const video = videos[id - 1]

    return res.render("edit", {
        pageTitle: `Edit: ${video.title}`,
        video: video
    });
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
}
export const postUpload = (req, res) => {
    const newVideo = {
        title: req.body.title,
        rating: 0,
        comments: 0,
        createdAt: "now",
        views: 0,
        id: videos.length + 1
    };
    videos.push(newVideo);
    return res.redirect("/");
}

// export default 를 하면 한 모듈에서 하나의 변수를 export 하게 됨.
// 위와 같은 방법으로 한 파일에서 여러 개를 export 할 수 있음
