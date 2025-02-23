import { Request, Response } from "express"
import moviesService from "./moviesService"

async function getAllMovies(req: Request, res: Response) {
    const context = await moviesService.getAllMovies()
    res.json(context)
}

async function getMovieById(req: Request, res: Response) {
    let id: number = Number(req.params.id)
    const context = await moviesService.getMovieById(id)
    res.json(context)
}

async function getAllRecentlyViewedMovie(req: Request, res: Response) {
    const context = await moviesService.getAllRecentlyViewedMovie()
    res.json(context)
}

const functions = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}

export default functions