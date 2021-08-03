import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
// session DB 와 mongoDB 를 연결해줌.

import { localsMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

// babel 이용해 최신문법 적용, import 뒤는 모듈이 default export 인 경우 이름 상관없음 (python as 와 유사)
// const express = require("express");
const app = express();
const logger = morgan("dev");
app.use(logger);
// use 는 global middleware(모든 route 에서 사용) 를 만들어줌. **get 보다 먼저 와야함!

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// views 폴더 경로 설정 (기본값은 node 시작점인 package.json 의 위치)

app.use(express.urlencoded({ extended: true }))
// express app 이 form 을 이해할 수 있도록 하는 Middleware
app.use(session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/metube",
    })
}))
/*
express-session 은 브라우저와 back-end 간의 "매번" 이루어지는 쿠키 교환에 session ID 를 넣어준다. 
express-session 은 쿠키에 session ID 를 넣어서 브라우저로 전송하고, 브라우저는 매 request 마다
쿠키를 함께 보냄. 따라서 서버에서 쿠키 내의 session ID 를 통해 session DB 에서 현재 사용자를 찾을 수 있음.
session != cookie (정보 교환 수단)
*/
app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
// Router 설정

export default app;