import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: String,
  // { type: String, required: true },
  email: String,
  // {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  password: String,
  // {
  //   type: String,
  //   select: false,
  //   required: true,
  // },
  // createdAt: { type: Date, default: Date.now },
});

export const user = mongoose.model("User", Schema);
