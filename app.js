import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";
import { connectDB } from "./data/dataBase.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./utils/error.js";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use(errorMiddleware);
