import asyncHandler from "../utils/errorHandlers/asyncHandler.js";
import ErrorResponse from "../utils/errorHandlers/ErrorResponse.js";

const getAll = (Model) =>
    asyncHandler(async (req, res, next) => {
        const data = await Model.find().lean();
        res.json(data);
    });

const getOneById = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const data = await Model.findById(id).lean();
        if (!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
        res.json(data);
    });

const createOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const data = await Model.create(req.body);
        res.status(201).json(data);
    });

const updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const {id} = req.params;
        const data = await Model.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.json({msg: 'Update successful', data});
    });

const deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const {id} = req.params;
        const data = await Model.findByIdAndDelete(id);
        if(!data) throw new ErrorResponse(`${Model.modelName} not found`, 404);
        res.json({msg: `Successfully deleted ${Model.modelName}`, data});
    });

export { getAll, getOneById, createOne, updateOne, deleteOne };
