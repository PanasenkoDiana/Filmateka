import { Request, Response } from "express"
import userService from "./userService"

async function getAllUsers(req: Request, res: Response) {
    const result = await userService.getAllUsers()
    res.json(result)
}

async function getUserById(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const result = await userService.getUserById(id)
    res.json(result)
}


async function createUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.createUser(data)
    res.json(result)
}

async function deleteUser(req: Request, res: Response) {
    const id: number = Number(req.body.id)
    const result = await userService.deleteUser(id)
    res.json(result)
}

const functions = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser
}

export default functions