import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
// export default 가 아닐 때 import 하는 방법
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
