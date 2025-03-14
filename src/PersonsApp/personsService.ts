import personsRepository from "./personsRepository"

import { IError, ISuccess } from "../types/types"
import { IPerson, ICreatePerson } from "./personsTypes"

async function getAllPersons(): Promise< IError | ISuccess<IPerson[]> > {
    const persons = await personsRepository.getAllPersons()
    if (!persons){
        return { status: 'error', message: 'Персони не знайдені' }
    }
    return { status: 'success', data: persons }
}

async function getPersonById(id: number): Promise< IError | ISuccess<IPerson> > {
    const person = await personsRepository.getPersonById(id)
    if (!person){
        return { status: 'error', message: 'Персона не знайдена' }
    }
    return { status: 'success', data: person }
}

async function createPerson(data: ICreatePerson): Promise< IError | ISuccess<IPerson> > {
    const person = await personsRepository.createPerson(data)
    if (!person){
        return { status: 'error', message: 'Персона не була створена' }
    }
    return { status: 'success', data: person }
}

async function deletePersonById(id: number) {
    await personsRepository.deletePersonById(id)
}


export default {
    getAllPersons,
    getPersonById,
    createPerson,
    deletePersonById
}