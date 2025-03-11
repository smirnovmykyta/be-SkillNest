import { mongoose } from "mongoose";
import chalk from "chalk";

export default async function dbInit() {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "SkillNest",
    });
    console.log(chalk.cyan(`DB connected to ${mongo.connection.name}`));
  } catch (error) {
    console.log(error.message);
    throw new Error("DB connection failed. Shutting down...");
  }
}
