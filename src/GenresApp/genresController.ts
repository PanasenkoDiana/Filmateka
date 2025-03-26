import { Request, Response } from "express";
import genresService from "./genresService";

async function getAllGenres(req: Request, res: Response) {
    const context = await genresService.getAllGenres();
    res.json(context);
}

async function deleteGenre(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await genresService.deleteGenre(id);
    res.json(response);
}

async function createGenre(req: Request, res: Response) {
    const { name, description } = req.body;
    // const hohol = req.body
    // console.log(hohol.description)
    if (!name) {
        return
    }

    const response = await genresService.createGenre(name, description);
    if (response.status === "error") {
        return
    }

    res.status(201).json(response);
}

async function updateGenre(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!name || !id) {
        return
    }
    const updatedGenre = await genresService.updateGenre(id, name);
    if (!updatedGenre) {
        return
    }
    res.json({ status: "success", data: updatedGenre });
}

const functions = {
    createGenre,
    getAllGenres,
    deleteGenre,
    updateGenre,
};

export default functions;