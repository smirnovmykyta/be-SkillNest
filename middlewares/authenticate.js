import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";

export default async function authenticate(req, res, next) {
  let { token } = req.cookies;

  const { authorization } = req.headers;
  if (authorization) {
    token = authorization.split(" ")[1];
  }

  if (!token) return next(new ErrorResponse("Not Authenticated", 401));

  try {
    const { userId } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(userId).select("email role _id");
    console.log(user);
    if (!user) return next(new ErrorResponse("Not Authenticated", 401));

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
