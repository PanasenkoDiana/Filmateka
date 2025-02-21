import { Prisma } from "../../prisma/prismaClient"

async function getAllGenres() {
    try {
        const data = await Prisma.genre.findMany()
        console.log(data)
        return data
    } catch (error) {
        console.error("Error getAllGenres: ", error);
        throw error;
    }
}

const functions = {
    getAllGenres: getAllGenres
}

export default functions