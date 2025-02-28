import { Router } from "express";
import { UserController } from "./userController";
import { authMiddleware } from "./authMiddleware";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", authMiddleware, userController.getUserData);

export default router;
