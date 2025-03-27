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

async function createMovie(req: Request, res: Response) {
    const data = req.body
    const result = await moviesService.createMovie(data)
    res.json(result)
}

async function updateMovie(req: Request, res: Response) {
    const data = req.body
    const result = await moviesService.updateMovie(data)
    res.json(result)
}

async function deleteMovie(req: Request, res: Response) {
    const id = Number(req.params.id)
    const result = await moviesService.deleteMovie(id)
    res.json(result)
}

async function getAllRecentlyViewedMovie(req: Request, res: Response) {
    const context = await moviesService.getAllRecentlyViewedMovie()
    res.json(context)
}

export default {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    createMovie: createMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}