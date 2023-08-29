import { user } from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let User = await user.findOne({ email });
  if (User)
    return res.status(404).json({
      success: false,
      message: "this email is taken, user another one",
    });

  const hashedPassword = await bcrypt.hash(password, 10);
  User = user.create({ name, email, password: hashedPassword });
  return setCookie(User, 201, "user registered", res);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let User = await user.findOne({ email });
  if (!User)
    return res.json({
      success: false,
      message: "register first",
    });
  const isMatch = await bcrypt.compare(password, User.password);
  if (isMatch) {
    return setCookie(User, 201, `login successfull, welcome ${User.name}`, res);
  }
  return res.json({
    success: true,
    message: "incorrect email or password",
  });
};

export const logoutUser = (req, res) => {
  
};
export const creatTask = (req, res) => {};
export const deleteTask = (req, res) => {};
export const allTask = (req, res) => {};
