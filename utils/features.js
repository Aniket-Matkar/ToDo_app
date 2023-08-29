import jwt from "jsonwebtoken";

export const setCookie = (User,statusCode=404,message,res)=>{
    const Token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", Token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    })
    .json({ success: true, message});
}