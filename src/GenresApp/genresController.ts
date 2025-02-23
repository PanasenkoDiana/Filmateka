import { Request, Response } from "express"
import genresService from "./genresService"

async function getAllGenres(req: Request, res: Response) {
    const context = await genresService.getAllGenres()
    res.json(context)
}

const functions = {
    getAllGenres: getAllGenres
}

export default functions