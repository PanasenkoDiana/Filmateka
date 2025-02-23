import genresRepository from "./genresRepository"
import { IError, ISuccess,  Genre } from "../types/types"

async function getAllGenres(): Promise< IError | ISuccess<Genre[]> > {
    const genres = await genresRepository.getAllGenres()
    if (!genres){
        return { status: 'error', message: 'Movies not found' }
    }
    return { status: 'success', data: genres }
}

const functions = {
    getAllGenres: getAllGenres
}

export default functions