import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  postText: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
