import personsRepository from "./personsRepository"
import { IError, ISuccess, Person } from "../types/types"

async function getAllPersons(): Promise< IError | ISuccess<Person[]> > {
    const data = await personsRepository.getAllPersons()
    if (!data){
        return { status: 'error', message: 'Persons not found' }
    }
    return { status: 'success', data: data }
}

async function getPersonById(id: number): Promise< IError | ISuccess<Person> > {
    const data = await personsRepository.getPersonById(id)
    if (!data){
        return { status: 'error', message: 'Person not found' }
    }
    return { status: 'success', data: data }
}

const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById
}

export default functions