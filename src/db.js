import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/metube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
mongoose.set('useCreateIndex', true)

// mongoDB 생성방법 => 자신 db 주소 뒤에 db 명을 추가해줌.
// mongoDB -> document data model 임. json 처럼.
// 다른 sql 기반 DB 와의 차이점.
// mongoose 는 nodeJS 와 mongoDB 를 연결해줌. npm 으로 설치해 사용.

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB successfully!")
const handleError = (error) => console.log("❌ DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);

// on 과 once 는 eventlistner 같은 역할을 하는듯. 다만 on 은 횟수 상관없이 실행, once 는 한번만. 알아봐야 할듯
// on = addEventListener, once 는 한번만 연결한 후 제거되는 메소드, js 엔 없고 nodeJS 에만 있는 것 같음.