import { Request, Response } from "express"
import moviesService from "./moviesService"

async function getAllMovies(req: Request, res: Response) {
    const context = await moviesService.getAllMovies()
    if (context.status == "error") {
        res.send(context.message)
    } else {
        res.json(context.data)
    }
}

async function getMovieById(req: Request, res: Response) {
    let id: number = Number(req.params.id)
    const context = await moviesService.getMovieById(id)
    if (context.status == "error") {
        res.send(context.message)
    } else {
        res.json(context.data)
    }
}

async function getAllRecentlyViewedMovie(req: Request, res: Response) {
    const context = await moviesService.getAllRecentlyViewedMovie()
    if (context.status == "error") {
        res.send(context.message)
    } else {
        res.json(context.data)
    }
}

const functions = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    getAllRecentlyViewedMovie: getAllRecentlyViewedMovie
}

export default functions