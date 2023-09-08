import { user } from "../models/users.js";
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
  let User = await user.findOne({ email }).select("+password");
  if (!User)
    return res.json({
      success: false,
      message: "register first",
    });
  const isMatch = bcrypt.compare(password, User.password);
  if (isMatch) {
    return setCookie(User, 201, `login successfull, welcome ${User.name}`, res);
  }
  return res.json({
    success: true,
    message: "incorrect email or password",
  });
};

export const me = (req, res) => {
  res.json({
    success: true,
    user: req.User,
  });
};
export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "logout successfully",
    });
};
