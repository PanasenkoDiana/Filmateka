import { Request, Response } from "express"
import genresService from "./genresService"

async function getAllGenres(req: Request, res: Response) {
    const result = await genresService.getAllGenres()
    res.json(result)
}

async function getGenreById(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const result = await genresService.getGenreById(id)
    res.json(result)
}

async function createGenre(req: Request, res: Response) {
    const data = req.body
    const result = await genresService.createGenre(data)
    res.json(result)
}

async function deleteGenreById(req: Request, res: Response) {
    const id: number = Number(req.body.id)
    const result = await genresService.deleteGenreById(id)
    res.json(result)
}

export default {
    getAllGenres,
    getGenreById,
    createGenre,
    deleteGenreById
}