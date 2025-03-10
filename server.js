import chalk from "chalk";
import dbInit from "./db/dbInit.js";
import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.SERVER_PORT || 8000;

let server;

async function startServer() {
  try {
    await dbInit();

    server = app.listen(port, () =>
      console.log(chalk.cyan(` SkillNest API listening on port ${port}... `))
    );
  } catch (err) {
    console.log(chalk.red(err.message));
    process.exit(1);
  }
}

startServer();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
      mongoose.connection.close(false, () => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });
  } else {
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  }
});
