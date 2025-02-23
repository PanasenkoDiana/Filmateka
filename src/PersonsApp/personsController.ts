import { Request, Response } from "express"
import personsService from "./personsService"

async function getAllPersons(req: Request, res: Response) {
    const context = await personsService.getAllPersons()
    res.json(context)
}

async function getPersonById(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const context = await personsService.getPersonById(id)
    res.json(context)
}

const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById
}

export default functions