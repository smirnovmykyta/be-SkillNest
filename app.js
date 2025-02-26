import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

import authRouter from "./routes/authRouter.js";
import ErrorResponse from "./utils/errorHandlers/ErrorResponse.js";
import errorHandler from "./utils/errorHandlers/errorHandler.js";
import advertisementRouter from "./routes/advertisementRouter.js";

const app = express();
app.use(cors());
// const allowedOrigins = [
// "http://localhost:5173",
// "http://localhost:5172",
// "https://personal-library-3k8z.onrender.com",
// ];

// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (!origin || allowedOrigins.includes(origin)) cb(null, true);
//       else cb(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/advertisement", advertisementRouter);

app.use("*", (req, res, next) => {
  next(new ErrorResponse(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
