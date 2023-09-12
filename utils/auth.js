import jwt from "jsonwebtoken";
import { user } from "../models/users.js";
import ErrorHandler from "./error.js";
export const isAunthicated = async(req, res, next) => {
  const { token } = req.cookies;
  if (!token)
   return next(new ErrorHandler(404,"login first"))
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  req.User = await user.findById(decoded._id);
  next();
};
