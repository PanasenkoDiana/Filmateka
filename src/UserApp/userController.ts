import { Request, Response } from "express";
import { UserService } from "./userService";
import { UserRepository } from "./userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userService = new UserService();
const userRepository = new UserRepository();
const SECRET_KEY = "secret_key";

export class UserController {
  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      const userData = req.body;
      const updatedUser = await userRepository.updateUser(userId, userData);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при обновлении пользователя" });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      await userRepository.deleteUser(userId);
      res.status(200).json({ message: "Пользователь успешно удален" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при удалении пользователя" });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, profileImage, age, role } = req.body;
      
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "Пользователь с таким email уже существует" });
        return;
      }
      
      const newUser = await userService.createUser({
        username,
        email,
        password,
        profileImage,
        age,
        role,
      });
      
      res.status(201).json({ message: "Пользователь успешно зарегистрирован", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка регистрации пользователя" });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await userService.findUserByEmail(email);

      if (!user) {
        res.status(401).json({ message: "Неверный email или пароль" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Неверный email или пароль" });
        return;
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка входа в систему" });
    }
  };
}
