import {Router} from "express";
import {deleteUserById, getAllUsers, getProfile, getUserById, updateUserById} from "../controllers/userControllers.js";
import {handleFileUpload} from "../middlewares/upload.js";
import {authenticate} from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.get("/", getAllUsers)
    .put("/", authenticate, handleFileUpload, updateUserById)
    .delete("/", authenticate, deleteUserById);

userRouter.get("/profile", authenticate, getProfile)
userRouter.get("/:id", getUserById);


export default userRouter;
