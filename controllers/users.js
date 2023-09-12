import { user } from "../models/users.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../utils/error.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let User = await user.findOne({ email });
    if (User)
      return next(
        new ErrorHandler(404, "this email is taken, use another one")
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    User = user.create({ name, email, password: hashedPassword });
    return setCookie(User, 201, "user registered", res);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let User = await user.findOne({ email }).select("+password");

    if (!User) return next(new ErrorHandler(404, "register first"));

    const isMatch = bcrypt.compare(password, User.password);
    if (isMatch)
      return setCookie(
        User,
        201,
        `login successfull, welcome ${User.name}`,
        res
      );
    return res.json({
      success: true,
      message: "incorrect email or password",
    });
  } catch (error) {
    next(error);
  }
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
