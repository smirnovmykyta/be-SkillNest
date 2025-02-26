import {Router} from "express";
import {deleteUserById, getAllUsers, getUserById, updateUserById} from "../controllers/userControllers.js";
import authenticate from '../middlewares/authenticate.js';
import {handleFileUpload} from "../middlewares/upload.js";

const userRouter = Router();

userRouter.get("/", getAllUsers)
    .put("/", authenticate, handleFileUpload, updateUserById)
    .delete("/", authenticate, deleteUserById);

userRouter.get("/:id", getUserById);

export default userRouter;
