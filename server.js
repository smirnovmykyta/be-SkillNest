import chalk from "chalk";
import dbInit from "./db/dbinit.js";
import app from "./app.js";

const port = process.env.SERVER_PORT || 8000;

let server;


dbInit()
    .then(() => {
        server = app.listen(port, () =>
            console.log(
                chalk.cyan(` SkillNest API listening on port ${port}... `)
            )
        );
    })
    .catch((err) => {
        console.log(chalk.red(err.message));
        process.exit(1);
    });

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        console.log("HTTP server closed");
    });
});
