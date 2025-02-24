import { Request, Response } from "express"
import userService from "./userService"

async function getUserById(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const context = await userService.getUserById(id)
    res.json(context)
}

async function createUser(req: Request, res: Response) {
    try {
        const data = req.body
        const context = await userService.createUser(data)
        
        if (context.status === 'error') {
            return res.status(400).json(context)
        }
        
        res.status(201).json(context)
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to create user' })
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' })
        }
        const context = await userService.loginUser(email, password)
        if (context.status === 'error') {
            return res.status(401).json(context)
        }
        res.json(context)
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Login failed' })
    }
}

async function getCurrentUser(req: Request, res: Response) {
    try {
        const userId = (req as any).userId
        const context = await userService.getUserById(userId)
        
        if (!context) {
            return res.status(404).json({ status: 'error', message: 'User not found' })
        }
        
        res.json(context)
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to get current user' })
    }
}

const functions = {
    getUserById,
    createUser,
    loginUser,
    getCurrentUser
}

export default functions