import { Request, Response } from "express"
import userService from "./userService"

async function getUserById(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const context = await userService.getUserById(id)
    res.json(context)
}

async function createUser(req: Request, res: Response) {
    const data = req.body
    const context = await userService.createUser(data)
    res.json(context)
}

async function authUser(req: Request, res: Response) {
    const data = req.body
    const user = await userService.authUser(data.email)
    res.json(user)
}

const functions = {
    getUserById: getUserById,
    createUser: createUser,
    authUser: authUser,
}

export default functions