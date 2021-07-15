import express from "express";
// babel 이용해 최신문법 적용
// const express = require("express");

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if (url === "/protected") {
        return res.send("<h1>Not Allowed</h1>")
    }
    console.log("Allowed")
    next();
}

const handleHome = (req, res) => {
    return res.end();
}

app.use(logger)
app.use(privateMiddleware)
app.get("/", handleHome)
// use 는 global middleware(모든 route 에서 사용) 를 만들어줌. **get 보다 먼저 와야함!

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`)
// ES6 함수 생성법 (매개변수) => 함수 console.log("Server listening on port 4000 🚀")

app.listen(PORT, handleListening);