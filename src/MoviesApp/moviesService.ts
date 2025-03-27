import moviesRepository from "./moviesRepository"
import { IError, ISuccess, RecentlyViewedMovie } from "../types/types"
import { IMovie } from "./moviesTypes"

async function getAllMovies(): Promise< IError | ISuccess<IMovie[]> > {
    const movies = await moviesRepository.getAllMovies()
    if (!movies){
        return { status: 'error', message: 'Movies not found' }
    }
    return { status: 'success', data: movies }
}

async function getMovieById(id: number): Promise< IError | ISuccess< IMovie > > {
    const movie = await moviesRepository.getMovieById(id);
    if (!movie){
        return { status: 'error', message: `Movie with id: ${id} not found`}
    }
    return { status: 'success', data: movie }
}

async function createMovie(data: IMovie): Promise< IError | ISuccess< IMovie > > {
    const movie = await moviesRepository.createMovie(data)
    if (!movie){
        return { status: 'error', message: 'Failed to create movie' }
    }
    return { status: 'success', data: movie }
}

async function deleteMovie(id: number) {
    await moviesRepository.deleteMovie(id)
    return { status:'success', message: 'Movie deleted successfully' }
}

async function updateMovie(data: IMovie): Promise< IError | ISuccess< IMovie > > {
    const movie = await moviesRepository.updateMovie(data)
    if (!movie){
        return { status: 'error', message: 'Failed to update movie' }
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

 

export default {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    createMovie: createMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}