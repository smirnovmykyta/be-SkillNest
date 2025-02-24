import asyncHandler from "../utils/errorHandlers/asyncHandler.js";
import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/errorHandlers/ErrorResponse.js";

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find()
        .select("_id name surname email")
        .lean();

    if (!users) throw new ErrorResponse("User not found", 404);
    res.json(users)
});

const getUserById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const user = id === req.user._id
        ? await UserModel.findById(id)
        .select("-password")
        .lean()
        : await UserModel.findById(id)
        .select("_id name surname email phoneNumber")
        .lean();
    // if(id === req.user._id) {
    //     const user = await UserModel.findById(id)
    //         .select("-password")
    //         .lean();
    //
    //     if (!user) throw new ErrorResponse("User not found", 404);
    //     res.json(user)
    // }
    //
    // const user = await UserModel.findById(id)
    //     .select("_id name surname email phoneNumber")
    //     .lean();

    if (!user) throw new ErrorResponse("User not found", 404);
    res.json(user)
});

export {getAllUsers, getUserById};
