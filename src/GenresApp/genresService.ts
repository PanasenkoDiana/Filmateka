import genresRepository from "./genresRepository"
import { IError, ISuccess,  Genre } from "../types/types"

async function getAllGenres(): Promise< IError | ISuccess<Genre[]> > {
    const data = await genresRepository.getAllGenres()
    if (!data){
        return { status: 'error', message: 'Movies not found' }
    }
    return { status: 'success', data: data }
}

const functions = {
    getAllGenres: getAllGenres
}

export default functions