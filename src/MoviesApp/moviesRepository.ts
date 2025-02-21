import { Prisma } from "../../prisma/prismaClient"

async function getAllMovies() {
    try {
        const movies = await Prisma.movie.findMany({
            include: {
                userReviews: true,
                movieStills: true,
                person: true,
                genres: true
            }
        })
        console.log(movies)
        return movies
    } catch (error) {
        console.error("Error getAllMovies: ", error);
        throw error;
    }
}

async function getMovieById(id: number) {
    try {
        const movie = await Prisma.movie.findUnique({
            where: {
                id: id
            },
            include: {
                person: true,
                genres: true,
            }
        })
        console.log(movie)
        return movie
    } catch (error) {
        console.error("Error getMovieById: ", error);
        throw error
    }
}

async function getAllRecentlyViewedMovie() {
    try {
        const movies = await Prisma.recentlyViewedFilm.findMany({
            include: {
                Movie: true
            }
        })
        console.log(movies)
        return movies
    } catch (error) {
        console.error("Error getMovies: ", error);
        throw error
    }
}

const functions = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}

export default functions