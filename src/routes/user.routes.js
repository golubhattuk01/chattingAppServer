import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/posts.model.js";
import Msg from "../models/msg.model.js";
const router = Router();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { json } from "express"; // No need for body-parser, use express.json()
import bcrypt from "bcrypt";
router.get("/", (req, res) => {
  res.send("server is running this is chatting app");
});
router.get("/golu", (req, res) => {
  res.send("hey goluuuuuuuuu");
});

router.post("/register", async (req, res) => {
  const { fullName, username, password, phone, email, jobProfile, address } =
    req.body;

  try {
    const newUser = await User.create({
      fullName,
      username,
      password,
      phone,
      email,
      jobProfile,
      address,
    });

    res.status(201).json(newUser);
  } catch (error) {
    // Handle the error case
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.json("notExist");
    } else {
      if (user.password == password) {
        res.json(user);
      } else {
        res.json("wrong password");
      }
    }
  } catch (error) {
    // Handle the error case
    console.error("Error Login user:", error);
    res.status(500).json({ error: "Error Login user" });
  }
});

//profile pic

cloudinary.config({
  cloud_name: "drqcugtxy",
  api_key: "168222195517435",
  api_secret: "Iv2_YoEtGNdhkNJJ_j7r5V_H6_g",
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });
    const result = await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Error during Cloudinary upload:", error);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("File uploaded to Cloudinary successfully");
            console.log(result.url);
            user.avatar = result.url;
            user.save();
            res.send("File uploaded to Cloudinary successfully");
          }
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ************************************
// post upload

router.post("/post", upload.single("file"), async (req, res) => {
  const username = req.body.username;
  const title = req.body.text;
  const user = await User.findOne({ username: username });

  try {
    const newPost = await Post.create({
      postText: title,
      userId: user._id,
    });
    // res.status(201).json(newPost);
  } catch (error) {
    // Handle the error case
    console.error("Error creating Post:", error);
    // res.status(500).json({ error: "Error creating Post" });
  }

  //uploading image on post
  try {
    const post = await Post.findOne({ postText: title });
    const result = await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Error during Cloudinary upload:", error);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("File uploaded to Cloudinary successfully");
            console.log(result.url);
            post.image = result.url;
            post.save();
            res.send("File of Post uploaded to Cloudinary successfully");
            user.postList.push(post._id);
            user.save();
          }
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/myuser", async (req, res) => {
  const { username } = req.body;
  const myUser = await User.findOne({ username: username }).populate(
    "postList"
  );
  res.json(myUser);
});
router.post("/mypost", async (req, res) => {
  const myPost = await Post.find().populate("userId");
  res.json(myPost);
});

router.post("/send", async (req, res) => {
  const { msgItem, userId } = req.body;
  try {
    const user = await User.findOne({ username: userId });

    const newMsg = await Msg.create({
      msgItem,
      userId: user._id,
    });

    user.msgList.push(newMsg);
    await user.save();

    res.json(newMsg);
  } catch (error) {
    console.error("Error while sending msg in server:", error);
    res.status(500).json({ error: "Error sending msg" });
  }
});

router.post("/msgFatch", async (req, res) => {
  const msgList = await Msg.find().populate("userId");
  res.json(msgList);
});

export default router;
