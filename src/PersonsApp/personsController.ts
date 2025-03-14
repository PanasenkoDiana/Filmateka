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

async function createPerson(req: Request, res: Response) {
    const data = req.body
    const result = await personsService.createPerson(data)
    res.json(result)
}

async function deletePersonById(req: Request, res: Response) {
    const id: number = Number(req.body.id)
    const result = await personsService.deletePersonById(id)
    res.json(result)
}

export default {
    getAllPersons,
    getPersonById,
    createPerson,
    deletePersonById
}