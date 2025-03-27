import { PrismaClient } from '@prisma/client'
import { ICreateMovie, IMovie } from './moviesTypes'

const Prisma = new PrismaClient()

async function getAllMovies() {
    try {
        const movies = await Prisma.movie.findMany({
            include: {
                genres: true
            }
        })
        console.log(movies)
        return movies
    } catch (error) {
        console.log(error)
    }
}

async function getMovieById(id: number) {
    try {
        const movie = await Prisma.movie.findUnique({
            where: {
                id: id
            },
            include: {
                comments: true,
                movieStills: true,
                persons: true,
                genres: true,
            }
        })
        console.log(movie)
        return movie
    } catch (error) {
        console.log(error)
    }
}

async function createMovie(data: ICreateMovie) {
    try {
        const movie = await Prisma.movie.create({
            data: data
        })
        console.log(movie)
        return movie
    } catch (error) {
        console.error(error);
    }
}

async function updateMovie(data: IMovie) {
    try {
        const movie = await Prisma.movie.update({
            where: {
                id: data.id
            },
            data: data
        })
        console.log(movie)
        return movie
    } catch (error) {
        console.error(error);
    }
}

async function deleteMovie(id: number) {
    try {
        await Prisma.movie.delete({
            where: {
                id: id
            }
        })
    } catch(error) {
        console.error(error);
    }
}

async function getAllRecentlyViewedMovie() {
    try {
        const movies = await Prisma.recentlyViewedMovie.findMany({
            include: {
                movie: true
            }
        })
        console.log(movies)
        return movies
    } catch (error) {
        console.error(error)
    }
}

export default {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    createMovie: createMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}