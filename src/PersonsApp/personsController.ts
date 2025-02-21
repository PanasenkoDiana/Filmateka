import { Request, Response } from "express"
import personsService from "./personsService"

async function getAllPersons(req: Request, res: Response) {
    const context = await personsService.getAllPersons()
    if (context.status == "error") {
        res.send(context.message)
    } else {
        res.json(context.data)
    }
}

async function getPersonById(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const context = await personsService.getPersonById(id)
    if (context.status == "error") {
        res.send(context.message)
    } else {
        res.json(context.data)
    }
}

const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById
}

export default functions