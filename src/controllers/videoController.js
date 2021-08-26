import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

// export default 를 하면 한 모듈에서 하나의 변수를 export 하게 됨.
// 위와 같은 방법으로 한 파일에서 여러 개를 export 할 수 있음

/* callback 이용한 코드.아래는 promise 이용.
    export const home = (req, res) => {
    Video.find({}, (error, videos) => {
        console.log("errors", error);
        console.log("videos", videos);
        return res.render("home", { "pageTitle": "HOME", videos });
    }); 
    };
*/

/* find: mongoose model의 메소드. {} 는 모든 video 를 찾겠다는 걸 의미한다. 
    django 의 objects 와 유사.
    아래 callback 과 await 차이 설명 읽기.
*/

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
        // callback 과 다른 async await 비동기 처리 js 의 promise.
        return res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        return res.render("404", { pageTitle: error });
    }
};

// await 를 find 앞에 적어줌으로써 find 에 callback 이 필요하지 않음을 알려줌. promise 방식.
// 위의 callback 형식으로 find 를 할 경우 find 다음의 코드가 find 완료를 기다리지 않고 실행 된 후
// find 가 완료되는 시점에 find 함수가 callback 되어 실행됨.
// 그러나 await 의 경우 find 가 완료되어야 다음 코드가 실행. 즉 DB 를 기다려 줌.
//  이를 비동기 처리라 함. js 문법으로 async function 내에서만 await 사용 가능.


export const watch = async (req, res) => {
    const { id } = req.params
    // ES6 문법. const id = req.params.id 와 동일 
    const video = await Video.findById(id).populate("owner").populate({
        path: "comments",
        populate: {
            path: "owner",
            model: "User",
        }
    });
    // Video Schema 에서 owner 를 User 의 object_id 로 지정해줬기 때문에 populate 사용 가능. mongoose 기능.
    if (!video) {
        return res.render("404", { pageTitle: "잘못된 접근입니다." });
    }
    return res.render("watch", {
        pageTitle: video.title, video
    });
}

export const getEdit = async (req, res) => {
    const { id } = req.params
    const { user: { _id } } = req.session;
    const video = await Video.findById(id);

    if (!video) {
        return res.status(404).render("404", { pageTitle: "잘못된 접근입니다." });
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "잘못된 접근입니다.");
        return res.status(403).redirect("/");
    }
    return res.render("edit", {
        pageTitle: "수정하기", video
    });
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { user: { _id } } = req.session;
    const { title, description, hashtags } = req.body;
    const video = await Video.findOne({ _id: id });
    if (!video) {
        return res.status(404).render("404", { pageTitle: "잘못된 접근입니다." });
    }
    // post 내용 얻는법 => req.body, params 는 router 에서 지정한 url 내 변수.
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "잘못된 접근입니다.");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title, description,
        hashtags: Video.formatHashtags(hashtags)
    });
    return res.redirect(`/videos/${id}`);
};


export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
}

export const postFormRecorder = async (req, res) => {
    const { user: { _id } } = req.session;
    const { videoUrl, thumbUrl } = req.files;
    const { title, description, hashtags } = req.body;

    try {
        const video = new Video({
            title,
            description,
            fileUrl: videoUrl[0].path,
            thumbUrl: thumbUrl[0].path,
            hashtags: Video.formatHashtags(hashtags),
            owner: _id
        });
        await video.save();
        const user = await User.findById(_id);
        user.videos.push(video._id);
        user.save();
        req.flash("info", "업로드 완료!");
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    };
};

export const postUpload = async (req, res) => {
    const { user: { _id } } = req.session;
    const { video: videoFile, thumb } = req.files;
    // req.files.video 를 videoFile 이란 변수로 저장. ES6!
    const { title, description, hashtags } = req.body;

    try {
        const video = new Video({
            title,
            description,
            fileUrl: videoFile[0].path,
            thumbUrl: thumb[0].path,
            hashtags: Video.formatHashtags(hashtags),
            owner: _id
        });
        await video.save();
        const user = await User.findById(_id);
        user.videos.push(video._id);
        user.save();
        req.flash("info", "업로드 완료!");
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message
        });
    }
}
// export const postUpload = async (req, res) => {
//     let fromRecorder = true;

//     // const { user: { _id } } = req.session;
//     // const { video: videoFile, thumb } = req.files;
//     // // req.files.video 를 videoFile 이란 변수로 저장. ES6!
//     // const { title, description, hashtags } = req.body;

//     if (fromRecorder) {
//         try {
//             const { videoFile, thumbFile } = req.body;
//             const { user: { _id } } = req.session;
//             const reader = new FileReader();
//             reader.addEventListener("loadend", () => {
//             })
//             reader.readAsArrayBuffer(blob);
//             console.log(reader);
//             console.log(reader.result);

//             const video = new Video({
//                 title: "Instant Video",
//                 description: "Instant Video",
//                 fileUrl: videoFile,
//                 thumbUrl: thumbFile,
//                 hashtags: "즉석 비디오",
//                 owner: _id
//             });
//             await video.save();
//             const user = await User.findById(_id);
//             user.videos.push(video._id);
//             user.save();
//             req.flash("info", "업로드 완료!");
//             return res.redirect("/");
//         } catch (error) {
//             console.log(error);
//             return res.status(400).render("upload", {
//                 pageTitle: "Upload Video",
//                 errorMessage: error._message
//             });
//         }
//     } else {
//         try {
//             const video = new Video({
//                 title,
//                 description,
//                 fileUrl: videoFile[0].path,
//                 thumbUrl: thumb[0].path,
//                 hashtags: Video.formatHashtags(hashtags),
//                 owner: _id
//             });
//             await video.save();
//             const user = await User.findById(_id);
//             user.videos.push(video._id);
//             user.save();
//             req.flash("info", "업로드 완료!");
//             return res.redirect("/");
//         } catch (error) {
//             console.log(error);
//             return res.status(400).render("upload", {
//                 pageTitle: "Upload Video",
//                 errorMessage: error._message
//             });
//         }
//     }
// }

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const { user: { _id } } = req.session;
    const user = await User.findById(_id);
    // 그냥 session 에서 찾아버리면 LogIn 당시 user 반환되므로 최신화 안되어있음.
    const video = await Video.findOne({ _id: id });
    if (!video) {
        return res.status(404).render("404", { pageTitle: "잘못된 접근입니다." });
    }
    if (String(video.owner) !== String(user._id)) {
        req.flash("error", "잘못된 접근입니다.");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    user.videos.splice(user.videos.indexOf(id), 1);
    // user videos array 에서도 삭제
    return res.redirect("/")
}


export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: { $regex: new RegExp(keyword, "i") }
            // 정규표현식으로 찾기. i 는 keyword를 대소문자 구분 없이 찾는 것을 의미
            // $regex 는 mongoDB 에서 지원. mongoose 는 이를 전달해준다.

        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", videos });
}

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}

export const recorder = (req, res) => {
    // ffmpeg.wasm error 잡기 위한 코드
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    req.flash("info", "화면이 나올 때까지 기다리세요");
    return res.render("record");
}

export const createComment = async (req, res) => {
    const { params: { id }, body: { text }, session: { user } } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    let comment;
    if (!user) {
        comment = await Comment.create({
            text,
            video: id,
        })
        video.comments.push(comment._id);
    } else {
        comment = await Comment.create({
            text,
            owner: user._id,
            video: id,
        })
        video.comments.push(comment._id);
    }
    video.save();

    return res.status(201).json({ newCommentId: comment._id });
}