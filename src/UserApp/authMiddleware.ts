import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { IError } from '../types/types';

interface AuthRequest extends Request {
    userId?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authMiddleware: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        const error: IError = { status: 'error', message: 'No token provided' };
        res.status(401).json(error);
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        const authError: IError = { status: 'error', message: 'Invalid token' };
        res.status(401).json(authError);
        return;
    }
}