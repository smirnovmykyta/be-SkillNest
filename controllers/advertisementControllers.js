import asyncHandler from "../utils/errorHandlers/asyncHandler.js";
import UserModel from "../models/UserModel.js";
import AdvertisementModel from "../models/AdvertisementModel.js";
import ErrorResponse from "../utils/errorHandlers/ErrorResponse.js";

export const getAllAdvertisementByUserId = () => asyncHandler(async (req, res) => {
    const userId = req.params.id
    const data = await AdvertisementModel.find({ userId: userId });

    if (!data.length) throw new ErrorResponse("Advertisements not found", 404);

    res.json(data)
});

export const updateAdvertisementById = () => asyncHandler(async (req, res) => {
    const advertisementId = req.params.id
    const {uploaded} = req.uploadedFiles;
    const updateData = {...req.body};

    if (uploaded.length > 0) {
        updateData.media = [...req.body.media, ...uploaded];
    }
    const data = await AdvertisementModel.findByIdAndUpdate(advertisementId, updateData, { new: true });

    if (!data) throw new ErrorResponse("Advertisements not found", 404);

    res.json({msg: 'Update successful', data});
});

