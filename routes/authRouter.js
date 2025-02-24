import { Router } from "express";
import {
  userSignup,
  userLogin,
  userLogout,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.post("/logout", authenticate, userLogout);

export default authRouter;
