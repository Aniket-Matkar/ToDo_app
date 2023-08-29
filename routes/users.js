import express from "express";
import { allTask, creatTask, deleteTask, loginUser, logoutUser, registerUser } from "../controllers/users.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.put("/task", creatTask);
router.delete("/delete", deleteTask);
router.get("/all", allTask);

export default router;
