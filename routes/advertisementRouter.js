import {Router} from "express";

import authenticate from "../middlewares/authenticate.js";
import {handleFileUpload} from "../middlewares/upload.js";
import AdvertisementModel from "../models/AdvertisementModel.js";
import {createOne, getAll, getOneById} from "../controllers/crudFactory.js";
import {
    deleteAdvertisementById,
    getAllAdvertisementByUserId,
    updateAdvertisementById
} from "../controllers/advertisementControllers.js";

const advertisementRouter = Router();

advertisementRouter.get("/", getAll(AdvertisementModel))
    .post("/", authenticate, createOne(AdvertisementModel));

advertisementRouter.get('/:id', getOneById(AdvertisementModel))
    .put("/id", authenticate, handleFileUpload, updateAdvertisementById)
    .delete("/id", authenticate, deleteAdvertisementById);

advertisementRouter.get("/user/:id", getAllAdvertisementByUserId)


export default advertisementRouter;
