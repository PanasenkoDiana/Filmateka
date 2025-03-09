import { Request, Response } from "express"
import personsService from "./personsService"

async function getAllPersons(req: Request, res: Response) {
    const result = await personsService.getAllPersons()
    res.json(result)
}

async function getPersonById(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const result = await personsService.getPersonById(id)
    res.json(result)
}

const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById
}

export default functions