import asyncHandler from "../utils/errorHandlers/asyncHandler.js";
import AdvertisementModel from "../models/AdvertisementModel.js";
import ErrorResponse from "../utils/errorHandlers/ErrorResponse.js";

export const getAllAdvertisementByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const data = await AdvertisementModel.find({ userId: userId });

  if (!data.length) throw new ErrorResponse("Advertisements not found", 404);

  res.json(data);
});

export const createAdvertisement = asyncHandler(async (req, res) => {
  // Don't trust the user to set themselves as the author. Always override the author with the session user.
  const ad = { ...req.body, userId: req.user };
  const resData = await AdvertisementModel.create(ad);
  res.status(201).json(resData);
});

export const updateAdvertisementById = asyncHandler(async (req, res) => {
  const advertisementId = req.params.id;
  const userId = req.user;
  const { uploaded } = req.uploadedFiles;
  const updateData = { ...req.body };

  if (updateData.userId !== userId)
    throw new ErrorResponse(
      "To modify the advertisement, the user must be its author.",
      403
    );

  if (uploaded && uploaded.length > 0) {
    updateData.media = [...req.body.media, ...uploaded];
  }

  const data = await AdvertisementModel.findByIdAndUpdate(
    advertisementId,
    updateData,
    { new: true }
  );

  if (!data) throw new ErrorResponse("Advertisements not found", 404);

  res.json({ msg: "Update successful", data });
});

export const deleteAdvertisementById = asyncHandler(async (req, res) => {
  const advertisementId = req.params.id;
  const userId = req.user;

  const advertisement = await AdvertisementModel.findById(
    advertisementId
  ).lean();

  if (!advertisement) throw new ErrorResponse("Advertisement not found", 404);
  if (advertisement.userId.toString() !== userId)
    throw new ErrorResponse(
      "To delete the advertisement, the user must be its author.",
      403
    );

  const data = await AdvertisementModel.findByIdAndDelete(advertisementId);
  if (!data) throw new ErrorResponse("Advertisement not found", 404);

  res.json({ msg: "Successfully deleted Advertisement", data });
});
