import moviesRepository from "./moviesRepository"

import { IError, ISuccess } from "../types/types"
import { IMovie, ICreateMovie, IRecentlyViewedMovie } from './moviesTypes'

async function getAllMovies(): Promise< IError | ISuccess<IMovie[]> > {
    const movies = await moviesRepository.getAllMovies()
    if (!movies){
        return { status: 'error', message: 'Фільмів не знайденоч' }
    }
    return { status: 'success', data: movies }
}

async function getMovieById(id: number): Promise< IError | ISuccess<IMovie> > {
    const movie = await moviesRepository.getMovieById(id);
    if (!movie){
        return { status: 'error', message: `Фільму не знайдено`}
    }
    return { status: 'success', data: movie }
}

async function createMovie(data: ICreateMovie): Promise< IError | ISuccess<IMovie> > {
    const movie = await moviesRepository.createMovie(data)
    if (!movie){
        return { status: 'error', message: 'Фільм не був створен' }
    }
    return { status: 'success', data: movie }
}

async function deleteMovieById(id: number) {
    await moviesRepository.deleteMovieById(id)
}

async function getAllRecentlyViewedMovie(): Promise< IError | ISuccess<IRecentlyViewedMovie[]>> {
    const movies = await moviesRepository.getAllRecentlyViewedMovie()
    if (!movies){
        return { status: 'error', message: 'Останніх перешлянутих фільмів не знайдено' }
    }
    return { status: 'success', data: movies }
}


export default {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovieById,
    getAllRecentlyViewedMovie
}