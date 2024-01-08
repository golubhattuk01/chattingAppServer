import mongoose from "mongoose";
import { DB_NAME } from "../constrants.js";

const connectDB = async () => {
  try {
    // const connetionInstance = await mongoose.connect(
    //   `${process.env.VITE_MONGODB_URL}/${DB_NAME}`
    // );
    const connetionInstance = await mongoose.connect(
      `mongodb+srv://golubhattuk01:golu2004@golubhattuk01.cdkiyqu.mongodb.net/SocialChat`
    );
    console.log(
      `DATA BASE CONNECTED and DB HOST : " ${connetionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`error got" ${error}`);
    process.exit(1);
  }
};

export default connectDB;
