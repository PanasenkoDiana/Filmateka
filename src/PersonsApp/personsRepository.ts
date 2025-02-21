import { Prisma } from "../../prisma/prismaClient"

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
        console.error("Error getAllPersons: ", error);
        throw error
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
        console.error("Error getMovieById: ", error);
        throw error
    }
}

const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById
}

export default functions