import { Prisma } from "../../prisma/prismaClient"

import { IPerson, ICreatePerson } from "./personsTypes"

async function getAllPersons() {
    try {
        const data = await Prisma.person.findMany({
            include: {
                roles: true
            }
        })
        console.log(data)
        return data
    } catch (error) {
        console.log("Error getAllPersons: ", error);
    }
}

async function getPersonById(id: number) {
    try {
        const person = await Prisma.person.findUnique({
            where: {
                id: id
            },
            include: {
                movies: true,
                roles: true
            }
        })
        console.log(person)
        return person
    } catch (error) {
        console.log("Error getMovieById: ", error);
    }
}

async function createPerson(data: ICreatePerson) {
    try {
        const person = await Prisma.person.create({
            data: data
        })
        console.log(person)
        return person
    } catch (error) {
        console.log(error)
    }
}

async function deletePersonById(id: number) {
    try {
        const person = await Prisma.person.delete({
            where: {
                id: id
            }
        })
        console.log(person)
    } catch (error) {
        console.log(error)
    }
}

export default {
    getAllPersons,
    getPersonById,
    createPerson,
    deletePersonById
}