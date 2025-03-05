import asyncHandler from "../utils/errorHandlers/asyncHandler.js";
import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/errorHandlers/ErrorResponse.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find().select("_id username email").lean();

  if (!users) throw new ErrorResponse("User not found", 404);
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id)
    .select("_id username email phoneNumber")
    .lean();

  if (!user) throw new ErrorResponse("User not found", 404);
  res.json(user);
});

const getProfile = asyncHandler(async (req, res) => {
  const id = req.user;

  const user = await UserModel.findById(id).select("-password").lean();

  if (!user) throw new ErrorResponse("User not found", 404);
  res.json(user);
});

const updateUserById = asyncHandler(async (req, res) => {
  const id = req.user;
  const { uploaded } = req.uploadedFiles;
  const updateData = { ...req.body };
  if (uploaded && uploaded.length > 0) {
    updateData.profileImg = [...req.body.profileImg, ...uploaded];
  }

  const data = await UserModel.findByIdAndUpdate(id, updateData, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await UserModel.findByIdAndDelete(id);
  if (!data) throw new ErrorResponse("User not found", 404);
  res.json({ msg: "Successfully deleted User", data });
});

export { getAllUsers, getUserById, updateUserById, deleteUserById, getProfile };
