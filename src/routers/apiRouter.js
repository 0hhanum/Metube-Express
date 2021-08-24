// API view => BE 에서 template 를 render 하지 않을 때 FE 와 BE 가 통신하는 방법.

import express from "express";
import { registerView, createComment, postFormRecorder } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comments", createComment);
apiRouter.post("/videos/upload", postFormRecorder);
export default apiRouter;