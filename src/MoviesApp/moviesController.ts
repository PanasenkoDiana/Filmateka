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

async function createMovie(req: Request, res: Response) {
    const data = req.body
    const result = await moviesService.createMovie(data)
    res.json(result)
}

async function deleteMovieById(req: Request, res: Response) {
    const id: number = Number(req.body.id)
    const result = await moviesService.deleteMovieById(id)
    res.json(result)
}

async function getAllRecentlyViewedMovie(req: Request, res: Response) {
    const result = await moviesService.getAllRecentlyViewedMovie()
    res.json(result)
}

export default {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovieById,
    getAllRecentlyViewedMovie
}