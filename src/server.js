import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

// babel 이용해 최신문법 적용, import 뒤는 모듈이 default export 인 경우 이름 상관없음 (python as 와 유사)
// const express = require("express");

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.use(logger);
// use 는 global middleware(모든 route 에서 사용) 를 만들어줌. **get 보다 먼저 와야함!

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
// Router 설정


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`)
// ES6 함수 생성법 (매개변수) => 함수 console.log("Server listening on port 4000 🚀")

app.listen(PORT, handleListening);