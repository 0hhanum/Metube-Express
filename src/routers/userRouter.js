import express from "express";
import { getEdit, postEdit, logout, see, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"), postEdit);
// all 을 이용해 get, post 모두 middleware 가 작동하도록 설정
// multer => single (하나의 파일에만 사용), "avatar" input 의 name 을 이용해서 해당 파일을 uploads/ 에 저장.
// multer 에 의해 이후 post 컨트롤러에서 req.file 을 사용할 수 있게됨. (input name="avatar" 인 파일 반환)

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;
