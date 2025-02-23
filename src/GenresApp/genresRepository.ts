import { Prisma } from "../../prisma/prismaClient"

async function getAllGenres() {
    try {
        const genres = await Prisma.genre.findMany()
        console.log(genres)
        return genres
    } catch (error) {
        console.log("Error getAllGenres: ", error)
    }
}

const functions = {
    getAllGenres: getAllGenres
}

export default functions