import UserModel from "../models/UserModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import signToken from "../utils/signToken.js";
import setAuthCookie from "../utils/setAuthCookie.js";

const userSignup = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // console.log("NOA", email, JSON.stringify({ email, password }));
  const emailInUse = await UserModel.exists({ email });
  if (emailInUse) throw new ErrorResponse("Email already in use", 409);

  const userMongoose = await UserModel.create(req.body);

  // const user = userMongoose.toObject();
  // delete user.password;

  // const token = signToken(user._id);

  // setAuthCookie(res, token);

  res.status(201).json({ msg: "User registration successfully!" });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password").lean();
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse("Incorrect password", 401);

  delete user.password;
  const token = signToken(user._id);
  setAuthCookie(res, token);

  res.json({ user, token });
});

const userLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logout successful" });
};

// const getMe = (req, res) => {
//   const { user } = req;
//   res.json({ user });
// };

export { userSignup, userLogin, userLogout }; //getMe
