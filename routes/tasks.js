import express from "express";
import { isAunthicated } from "../utils/auth.js";
import {
  creatTask,
  allTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.js";
const router = express.Router();

router.post("/task", isAunthicated, creatTask);
router.get("/all", isAunthicated, allTask);
router
  .route("/:id")
  .put(isAunthicated, updateTask)
  .delete(isAunthicated, deleteTask);

export default router;
