import mongoose from "mongoose";
const msgSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    msgItem: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Msg = mongoose.model("Msg", msgSchema);

export default Msg;
