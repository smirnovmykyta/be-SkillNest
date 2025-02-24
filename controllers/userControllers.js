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
    const _id = '67bc6cc5e5989654b8770f2c';
    const user = id === /*req.user.*/_id
        ? await UserModel.findById(id)
        .select("-password")
        .lean()
        : await UserModel.findById(id)
        .select("_id name surname email phoneNumber")
        .lean();

    if (!user) throw new ErrorResponse("User not found", 404);
    res.json(user)
});

const updateUserById = () => asyncHandler(async (req, res) => {
        const {id} = req.user._id;
        const data = await UserModel.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.json({msg: 'Update successful', data});
    });

const deleteUserById = () => asyncHandler(async (req, res) => {
        const {id} = req.user._id;
        const data = await UserModel.findByIdAndDelete(id);
        if(!data) throw new ErrorResponse("User not found", 404);
        res.json({msg: 'Successfully deleted User', data});
    });

export {getAllUsers, getUserById};
