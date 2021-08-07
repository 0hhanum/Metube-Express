import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
// export default 가 아닐 때 import 하는 방법
import { home, search } from "../controllers/videoController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
