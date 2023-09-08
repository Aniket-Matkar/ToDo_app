import express from "express";
import {
  loginUser,
  logoutUser,
  me,
  registerUser,
} from "../controllers/users.js";
import { isAunthicated } from "../utils/auth.js";
import { allTask, creatTask, deleteTask, updateTask } from "../controllers/tasks.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAunthicated, me);
router.post("/logout", isAunthicated, logoutUser);

router.post("/task", isAunthicated, creatTask);
router.get("/all", isAunthicated, allTask);
router.delete("/delete", isAunthicated, deleteTask);
router
  .route("/:id")
  .put(isAunthicated, updateTask)
  .delete(isAunthicated, deleteTask);
export default router;
