import { Request, Response } from "express"
import moviesService from "./moviesService"

async function getAllMovies(req: Request, res: Response) {
    const result = await moviesService.getAllMovies()
    res.json(result)
}

async function getMovieById(req: Request, res: Response) {
    let id: number = Number(req.params.id)
    const result = await moviesService.getMovieById(id)
    res.json(result)
}

async function getAllRecentlyViewedMovie(req: Request, res: Response) {
    const result = await moviesService.getAllRecentlyViewedMovie()
    res.json(result)
}

const functions = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}

export default functions