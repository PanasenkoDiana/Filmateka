import genresRepository from "./genresRepository";
import { IError, ISuccess, Genre } from "../types/types";
import { Prisma } from "../../prisma/prismaClient";

async function getAllGenres(): Promise<IError | ISuccess<Genre[]>> {
    // const genres: Genre[] | null = (await genresRepository.getAllGenres()) ?? null;
    const genres = await genresRepository.getAllGenres()
    if (!genres) {
        return { status: "error", message: "Genres not found" } as IError;
    }
    return { status: "success", data: genres } as ISuccess<Genre[]>;
}

async function deleteGenre(id: number): Promise<IError | ISuccess<null>> {
    if (!id) {
        return { status: "error", message: "Invalid ID" };
    }

    return await genresRepository.deleteGenre(id) as IError | ISuccess<null>;
}

async function createGenre(name: string, description: string | null): Promise<IError | ISuccess<Genre>> {
    if (!name || typeof name !== "string") {
        return { status: "error", message: "Invalid genre name" } as IError;
    }

    const newGenre = await genresRepository.createGenre(name, description);

    if (!newGenre) {
        return { status: "error", message: "Failed to create genre" } as IError;
    }

    return { status: "success", data: newGenre } as ISuccess<Genre>;
}

async function updateGenre(id: number, name: string) {
    try {
        const updatedGenre = await Prisma.genre.update({
            where: { id },
            data: { name },
        });
        return updatedGenre;
    } catch (error) {
        console.error("Error updateGenre: ", error);
        return null;
    }
}

const functions = {
    createGenre,
    getAllGenres,
    deleteGenre,
    updateGenre,
};

export default functions;
