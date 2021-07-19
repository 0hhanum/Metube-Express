import express from "express";
import { join } from "../controllers/userController";
// export default 가 아닐 때 import 하는 방법
import { trending } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);

export default globalRouter;
