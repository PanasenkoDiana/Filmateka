import { Prisma } from "../../prisma/prismaClient"

import { ICreateGenre } from "./genresTypes"

async function getAllGenres() {
    try {
        const genres = await Prisma.genre.findMany()
        console.log(genres)
        return genres
    } catch (error) {
        console.log(error)
    }
}

async function getGenreById(id: number) {
    try {
        const genres = await Prisma.genre.findUnique({
            where: {
                id: id
            }
        })
        console.log(genres)
        return genres
    } catch (error) {
        console.log(error)
    }
}

async function createGenre(data: ICreateGenre) {
    try {
        const genre = await Prisma.genre.create({
            data: data
        })
        console.log(genre)
        return genre
    } catch (error) {
        console.log(error)
    }
}

async function deleteGenreById(id: number) {
    try {
        const genre = await Prisma.genre.delete({
            where: {
                id: id
            }
        })
        console.log(genre)
    } catch (error) {
        console.log(error)
    }
}

export default {
    getAllGenres,
    getGenreById,
    createGenre,
    deleteGenreById
}