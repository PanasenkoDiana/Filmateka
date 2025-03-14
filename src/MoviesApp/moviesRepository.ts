import { Prisma } from "../../prisma/prismaClient"

import { ICreateMovie } from './moviesTypes'

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
        console.log("Error getAllMovies: ", error)
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
        console.log("Error getMovieById: ", error)
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
        console.log(error)
    }
}

async function deleteMovieById(id: number) {
    try {
        const movie = await Prisma.movie.delete({
            where: {
                id: id
            }
        })
        console.log(movie)
    } catch (error) {
        console.log(error)
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
        console.error("Error getMovies: ", error);
        throw error
    }
}

export default {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovieById,
    getAllRecentlyViewedMovie
}