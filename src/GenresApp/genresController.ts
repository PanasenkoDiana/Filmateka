import { Request, Response } from "express"
import genresService from "./genresService"

async function getAllGenres(req: Request, res: Response) {
    const result = await genresService.getAllGenres()
    res.json(result)
}

const functions = {
    getAllGenres: getAllGenres
}

export default functions