import { async } from "regenerator-runtime";
import Video from "../models/Video";

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
        const videos = await Video.find({})
        // callback 과 다른 async await 비동기 처리 js 의 promise.
        return res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("ERROR!");
    }
};

// await 를 find 앞에 적어줌으로써 find 에 callback 이 필요하지 않음을 알려줌. promise 방식.
// 위의 callback 형식으로 find 를 할 경우 find 다음의 코드가 find 완료를 기다리지 않고 실행 된 후
// find 가 완료되는 시점에 find 함수가 callback 되어 실행됨.
// 그러나 await 의 경우 find 가 완료되어야 다음 코드가 실행. 즉 DB 를 기다려 줌.
//  이를 비동기 처리라 함. js 문법으로 async function 내에서만 await 사용 가능.


export const watch = (req, res) => {
    const { id } = req.params
    // ES6 문법. const id = req.params.id 와 동일 
    return res.render("watch", {
        pageTitle: `Watching: #${id}`,
    });
}

export const getEdit = (req, res) => {
    const { id } = req.params

    return res.render("edit", {
        pageTitle: "Editing Video",
    });
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
}
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const video = new Video({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map(word => `#${word}`),
        meta: {
            views: 0,
            rating: 0
        }
    });
    await video.save();
    return res.redirect("/");
}
