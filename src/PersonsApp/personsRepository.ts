import { Prisma } from "../../prisma/prismaClient"

async function getAllPersons() {
    try {
        const data = await Prisma.person.findMany({
            include: {
                roles: true
            }
        })
        // console.log(data)
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

async function deletePerson(id: number) {
    try {
        await Prisma.person.delete({
            where: { id }
        })
        return { status: 'success', message: 'person deleted' }
    } catch(error) {
        console.error("Error deletePerson: ", error);
        return { status: 'error', message: 'Failed to delete person' };
    }
}

async function createPerson(name: string, surname: string | null, photo: string | null, description: string | null) {
    try {
        const person = await Prisma.person.create({
            data: {
                name,
                surname,
                photo,
                description
            }
        })
        console.log(person)
        return person
    } catch (error) {
        console.error("Error createPerson: ", error);
        return null
    }
}

const functions = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById,
    deletePerson: deletePerson,
    createPerson: createPerson, 
}

export default functions