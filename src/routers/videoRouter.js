import express from "express";
import { watch, getEdit, postEdit, deleteVideo, getUpload, postUpload, recorder } from "../controllers/videoController";
import { videoUpload, protectorMiddleware } from "../middlewares";


const videoRouter = express.Router();

// videoRouter.get("/:id(\\d+)", watch);
// videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumb", maxCount: 1 }
]), postUpload);
// multer middleware 통해 2개 이상의 파일을 올릴 때 fields 이용
videoRouter.get("/record", protectorMiddleware, recorder);
export default videoRouter;
