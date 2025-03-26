import { Request, Response } from "express";
import * as userService from "./userService";

export async function register(req: Request, res: Response): Promise<void> {
    const { username, email, password, profileImage, age, role } = req.body;
    if (!username || !email || !password || !age) {
        res.status(400).json({ status: "error", message: "Missing required fields" });
        return;
    }
    const result = await userService.createUser({ username, email, password, profileImage, age, role: "USER" });
    res.status(result.status === 'success' ? 201 : 400).json(result);
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ status: "error", message: "Email and password are required" });
        return;
    }
    const result = await userService.loginUser(email, password);
    res.status(result.status === 'success' ? 200 : 401).json(result);
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    const result = await userService.getAllUsers();
    res.status(result.status === 'success' ? 200 : 500).json(result);
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const result = await userService.deleteUser(id);
    res.status(result.status === 'success' ? 200 : 500).json(result);
}

export async function createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, profileImage, age, role } = req.body;

    if (!username || !email || !password || !age || !role) {
        res.status(400).json({ status: "error", message: "Missing required fields" });
        return;
    }

    const result = await userService.createUser({ username, email, password, profileImage, age, role });
    res.status(result.status === 'success' ? 201 : 400).json(result);
}

export async function updateUser(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userData = req.body;
    
    if (!id || !userData) {
        res.status(400).json({ status: "error", message: "Invalid request data" });
        return;
    }

    const result = await userService.updateUser(id, userData);
    res.status(result.status === 'success' ? 200 : 404).json(result);
}