import jwt from "jsonwebtoken";
import { user } from "../models/users.js";
export const isAunthicated = async(req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "login first",
    });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  req.User = await user.findById(decoded._id);
  next();
};
