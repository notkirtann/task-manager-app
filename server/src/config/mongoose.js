import "dotenv/config";
import chalk from 'chalk'
// import { fileURLToPath } from 'url';
// import path from 'path';
import mongoose from "mongoose";

// // Load .env before anything else
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({
//   path: path.resolve(__dirname, '../../.env'),
// });

const url = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    console.log(chalk.blueBright("Loaded MONGODB_URL:",process.env.MONGODB_URL,));
    const connectionInstance = await mongoose.connect(url);
    console.log(chalk.green("MongoDB connected successfully",));
    console.log(chalk.yellow(`Deatils : ${connectionInstance.connection.host}`));
  } catch (error) {
    console.log(chalk.red("MongoDB connection failed:",error,));
    process.exit(1);
  }
};
export default connectDB;