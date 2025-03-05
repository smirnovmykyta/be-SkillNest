import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getProfile,
  getUserById,
  updateUserById,
} from "../controllers/userControllers.js";
import { handleFileUpload } from "../middlewares/upload.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/profile", authenticate, getProfile);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", authenticate, deleteUserById);
userRouter.put("/", authenticate, handleFileUpload, updateUserById);

export default userRouter;
