import {Router} from "express";
import {getAllUsers, getUserById} from "../controllers/userControllers.js";
import {deleteOne, updateOne} from "../controllers/crudFactory.js";
import UserModel from "../models/UserModel.js";
import authenticate from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter
    .get("/:id", getUserById)
    .put("/:id", authenticate, updateOne(UserModel))
    .delete("/:id", authenticate, deleteOne(UserModel));

export default userRouter;
