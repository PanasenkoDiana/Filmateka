import genresRepository from "./genresRepository"

import { IError, ISuccess } from "../types/types"
import { IGenre, ICreateGenre } from "./genresTypes"

async function getAllGenres(): Promise< IError | ISuccess<IGenre[]> > {
    const genres = await genresRepository.getAllGenres()
    if (!genres){
        return { status: 'error', message: 'Жанрів не знайдено' }
    }
    return { status: 'success', data: genres }
}

async function getGenreById(id: number): Promise< IError | ISuccess<IGenre> > {
    const genre = await genresRepository.getGenreById(id)
    if (!genre){
        return { status: 'error', message: 'Жанр не знайдено' }
    }
    return { status: 'success', data: genre }
}

async function createGenre(data: ICreateGenre): Promise< IError | ISuccess<IGenre> > {
    const genre = await genresRepository.createGenre(data)
    if (!genre){
        return { status: 'error', message: 'Жанр не був створен' }
    }
    return { status: 'success', data: genre }
}

async function deleteGenreById(id: number) {
    await genresRepository.deleteGenreById(id)
}

export default {
    getAllGenres,
    getGenreById,
    createGenre,
    deleteGenreById
}