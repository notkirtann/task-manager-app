import 'dotenv/config';
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

  const connectDB = async()=>{
    try {
      console.log("<-------------------------------------------------->Loaded MONGODB_URL:", process.env.MONGODB_URL);
      const connectionInstance = await mongoose.connect(url)
      console.log("<-------------------------------------------------->MongoDB connected successfully")
      console.log(`Deatils : ${connectionInstance.connection.host}`);
      
    } catch (error) {
      console.log("MongoDB connection failed:----------------->X X X X X X", error);
      process.exit(1);
    }
  }

export default connectDB;