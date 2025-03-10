import { Request, Response } from "express";
import { UserService } from "./userService";
import { UserRepository } from "./userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userService = new UserService();
const userRepository = new UserRepository();
const SECRET_KEY = "secret_key";

export class UserController {
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

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

      res.json({ message: "Авторизация успешна", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка авторизации" });
    }
  };

  getUserData = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id);
    
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: "Пользователь не найден" });
        return;
      }
      res.json({ message: "Авторизация успешна", username: user.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка авторизации" });
    }
  };
}
