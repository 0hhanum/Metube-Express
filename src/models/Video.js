import mongoose from "mongoose";

// mongoose 에게 데이터 model 의 형태를 알려주는 js 파일
const videoSchema = new mongoose.Schema({
    // min max length 를 html 에만 해두면 사용자가 브라우저를 이용해 해당 옵션을 삭제할 수 있다.
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 10 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    }
});

// new => js 의 생성자. 파이썬 클래스의 init 처럼 객체를 반환해준다.

videoSchema.pre("save", async function () {
    console.log(this.hashtags);
    this.hashtags = this.hashtags[0].split(",").map((word) => word.startsWith("#") ? word : `#${word}`)
})
// videoSchema 가 실행되기 전에 시행할 함수 (hook -> middleware 개념)
// this 는 python 클래스의 self 와 유사.

const Video = mongoose.model("Video", videoSchema);

export default Video;