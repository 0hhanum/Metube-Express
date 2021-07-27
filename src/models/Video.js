import mongoose from "mongoose";

// mongoose 에게 데이터 model 의 형태를 알려주는 js 파일
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    }
});

// new => js 의 생성자. 파이썬 클래스의 init 처럼 객체를 반환해준다.

const Video = mongoose.model("Video", videoSchema);

export default Video;