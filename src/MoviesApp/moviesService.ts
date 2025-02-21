import moviesRepository from "./moviesRepository"
import { IError, ISuccess, Movie, RecentlyViewedMovie } from "../types/types"

async function getAllMovies(): Promise< IError | ISuccess<Movie[]> > {
    const movies = await moviesRepository.getAllMovies()
    if (!movies){
        return { status: 'error', message: 'Movies not found' }
    }
    return { status: 'success', data: movies }
}

async function getMovieById(id: number): Promise< IError | ISuccess<Movie> > {
    const movie = await moviesRepository.getMovieById(id);
    if (!movie){
        return { status: 'error', message: `Movie with id: ${id} not found`}
    }
    return { status: 'success', data: movie }
}

async function getAllRecentlyViewedMovie(): Promise< IError | ISuccess<RecentlyViewedMovie[]>> {
    const movies = await moviesRepository.getAllRecentlyViewedMovie()
    if (!movies){
        return { status: 'error', message: 'Recently viewed movies not found' }
    }
    return { status: 'success', data: movies }
}


const functions = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}

export default functions