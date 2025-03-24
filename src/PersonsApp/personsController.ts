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

async function deletePerson(req: Request, res: Response) {
    const id = Number(req.params.id)
    const response = await personsService.deletePerson(id)
    res.json(response)
}

async function createPerson(req: Request, res: Response) {
    const { name } = req.body

    if (!name) {
        return
    }

    const response = await personsService.createPerson(name);
    if (response.status === 'error') {
        return
    }

    res.status(201).json(response);
}

async function updatePerson(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { name } = req.body

    if (!name || !id) {
        return
    }

    const updatedPerson = await personsService.updatePerson(id, name)
    if (!updatedPerson){
        return
    }

    res.json({ status: "success", data: updatedPerson });
}

const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById,
    deletePerson: deletePerson,
    createPerson: createPerson,
    updatePerson: updatePerson,

}

export default functions