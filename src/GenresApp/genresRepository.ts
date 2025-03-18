import { Prisma } from "../../prisma/prismaClient";

async function getAllGenres() {
    try {
        const genres = await Prisma.genre.findMany();
        return genres;
    } catch (error) {
        console.error("Error getAllGenres: ", error);
        return null;
    }
}

async function deleteGenre(id: number) {
    try {
        await Prisma.genre.delete({
            where: { id }
        });
        return { status: 'success', message: 'Genre deleted' };
    } catch (error) {
        console.error("Error deleteGenre: ", error);
        return { status: 'error', message: 'Failed to delete genre' };
    }
}

async function createGenre(name: string) {
    try {
        const newGenre = await Prisma.genre.create({
            data: {
                name,
            },
        });
        return newGenre;
    } catch (error) {
        console.error("Error createGenre: ", error);
        return null;
    }
}

const functions = {
    createGenre,
    getAllGenres,
    deleteGenre,
};

export default functions;
