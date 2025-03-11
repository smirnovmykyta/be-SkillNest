import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import signToken from "../utils/token/signToken.js";
import asyncHandler from "../utils/errorHandlers/asyncHandler.js";
import ErrorResponse from "../utils/errorHandlers/ErrorResponse.js";

const userSignup = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const emailInUse = await UserModel.exists({ email });
  console.log("email in use?", email, emailInUse);
  if (emailInUse) throw new ErrorResponse("Email already in use", 409);

  await UserModel.create(req.body);

  res.status(201).json({ msg: "User registration successfully!" });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password").lean();
  if(!user) throw new ErrorResponse("No user found with this email.", 404)
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse("Wrong password. Please check and try again.", 401);

  delete user.password;
  const token = signToken(user._id);

  res.json({ user, token });
});

const userLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logout successful" });
};

export { userSignup, userLogin, userLogout };
