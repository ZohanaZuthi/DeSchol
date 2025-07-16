import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { login, registerUser, updateProfile, logout } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",login);
router.post("/updateProfile",isAuthenticated,updateProfile);
router.post("/logout",logout);

export default router;