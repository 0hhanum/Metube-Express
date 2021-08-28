import "regenerator-runtime";
import "dotenv/config";
import "./db";
// 파일 자체를 import. 파일은 import 되는 순간 실행되며 서버에 db를 연결시킨다.
import "./models/Video";
import "./models/User";
import "./models/Comment";
// 마찬가지로 import 를 통해 실행시켜 model 의 형태를 전달.
import app from "./server";


const PORT = process.env.PORT || 4000;
// heroku port 가 존재하지 않으면 4000 포트로 연결

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`)
// ES6 함수 생성법 (매개변수) => 함수 console.log("Server listening on port 4000 🚀")

app.listen(PORT, handleListening);