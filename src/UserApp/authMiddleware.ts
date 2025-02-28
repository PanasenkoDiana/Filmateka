import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_jwt_secret_key";

interface CustomRequest extends Request {
  userId?: number;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Не авторизован" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
