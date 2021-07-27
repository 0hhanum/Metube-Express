import express from "express";
import { join, login } from "../controllers/userController";
// export default 가 아닐 때 import 하는 방법
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
