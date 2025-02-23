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

const functions = {
    getUserById: getUserById,
    createUser: createUser
}

export default functions