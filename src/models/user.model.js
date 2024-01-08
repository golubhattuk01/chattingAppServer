import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    postList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String, //cloudnary service
      // required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    jobProfile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    msgList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Msg",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
