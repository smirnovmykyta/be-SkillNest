import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

import authRouter from "./routes/authRouter.js";
import ErrorResponse from "./utils/errorHandlers/ErrorResponse.js";
import errorHandler from "./utils/errorHandlers/errorHandler.js";
import advertisementRouter from "./routes/advertisementRouter.js";
import searchRouter from "./routes/searchRouter.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/advertisement", advertisementRouter);
app.use("/api", searchRouter);

app.use("*", (req, res, next) => {
  next(new ErrorResponse(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
