import personsRepository from "./personsRepository"
import { IError, ISuccess, Person } from "../types/types"
import { Prisma } from "../../prisma/prismaClient"

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

async function deletePerson(id: number): Promise<IError | ISuccess<null>> {
    if (!id) {
        return { status: 'error', message: 'Invalid id' }
    }

    return await personsRepository.deletePerson(id) as IError | ISuccess<null>
}

async function createPerson(name: string): Promise<IError | ISuccess<Person>> {
    if (!name || typeof name !== 'string'){
        return { status: 'error', message: 'Invalid name' } as IError
    }

    const newPerson = await personsRepository.createPerson(name)

    if(!newPerson) {
        return { status: 'error', message: 'Failed to create person' } as IError    
    }

    return { status:'success', data: newPerson } as ISuccess<Person>
}

async function updatePerson(id: number, name: string) {
    try {
        const updatedPerson = await Prisma.person.update({
            where: { id },
            data: { name },
        })
        return updatePerson
    } catch (error) {
        console.error("Error updateGenre: ", error);
        return null;
    }
}



const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById,
    deletePerson: deletePerson,
    createPerson: createPerson,
    updatePerson: updatePerson,
}

export default functions