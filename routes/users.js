import express from "express";
import {
  loginUser,
  logoutUser,
  me,
  registerUser,
} from "../controllers/users.js";
import { isAunthicated } from "../utils/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAunthicated, me);
router.post("/logout", isAunthicated, logoutUser);

export default router;
