import { Router } from "express";

import { handleFileUpload } from "../middlewares/upload.js";
import AdvertisementModel from "../models/AdvertisementModel.js";
import { getAll, getOneById } from "../controllers/crudFactory.js";
import {
  createAdvertisement,
  deleteAdvertisementById,
  getAllAdvertisementByUserId,
  updateAdvertisementById,
} from "../controllers/advertisementControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const advertisementRouter = Router();

advertisementRouter
  .get("/", getAll(AdvertisementModel))
  .post("/", authenticate, createAdvertisement);

advertisementRouter
  .get("/:id", getOneById(AdvertisementModel))
  .put("/:id", authenticate, handleFileUpload, updateAdvertisementById)
  .delete("/:id", authenticate, deleteAdvertisementById);

advertisementRouter.get("/user/:id", getAllAdvertisementByUserId);

export default advertisementRouter;
