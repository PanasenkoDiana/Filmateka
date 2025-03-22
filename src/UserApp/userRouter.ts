import express from "express";
import { UserController } from "./userController";
import { authMiddleware } from "./authMiddleware";

const router = express.Router();
const userController = new UserController();

// Authentication routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Admin routes - protected by authentication
router.get("/all", authMiddleware, userController.getAllUsers);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

export default router;
