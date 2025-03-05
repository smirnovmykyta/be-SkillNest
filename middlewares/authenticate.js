import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/errorHandlers/ErrorResponse.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/errorHandlers/asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization) {
    token = authorization.split(" ")[1];
  }

  if (!token) return next(new ErrorResponse("Not Authenticated", 401));

    const { userId } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(userId).select("email _id").lean();

    if (!user) return next(new ErrorResponse("Not Authenticated", 401));

    req.user = userId;
    next();
});
