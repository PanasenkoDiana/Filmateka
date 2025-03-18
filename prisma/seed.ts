import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movieGenresSelect = [
    "Action", "Adventure", "Crime", "Drama", "Fantasy",
    "History", "Mystery", "Romance", "Sci-Fi", "Thriller", "War"
];

const personRoles = ["Actor", "Director"];

async function main() {
    for (const genre of movieGenresSelect) {
        await prisma.genre.upsert({
            where: { id: (await prisma.genre.findFirst({ where: { name: genre } }))?.id || -1 }, 
            update: {},
            create: { name: genre }
        });
    }

    for (const role of personRoles) {
        await prisma.personRole.upsert({
            where: { id: (await prisma.personRole.findFirst({ where: { name: role } }))?.id || -1 },
            update: {},
            create: { name: role }
        });
    }

    const movies = [
        {
            title: "Battlefield Glory",
            rating: 9.0,
            releaseYear: 2025,
            mainLanguage: "Japanese",
            productionCountry: "Japan",
            ageRating: "R",
            runtime: 155,
            poster: "https://example.com/battlefield_glory.jpg",
            shortDescription: "A heroic general leads his army in a legendary battle.",
            additionalInfo: "Epic war scenes with practical effects.",
            interestingFacts: "Based on the Battle of Sekigahara.",
            genres: ["War", "Action"]
        },
        {
            title: "Mystic Shadows",
            rating: 8.5,
            releaseYear: 2024,
            mainLanguage: "English",
            productionCountry: "USA",
            ageRating: "PG-13",
            runtime: 130,
            poster: "https://example.com/mystic_shadows.jpg",
            shortDescription: "A detective unravels a dark mystery in a haunted town.",
            additionalInfo: "Inspired by real paranormal cases.",
            interestingFacts: "Filmed in historic locations with eerie atmosphere.",
            genres: ["Mystery", "Thriller"]
        },
        {
            title: "Galactic Frontier",
            rating: 8.8,
            releaseYear: 2026,
            mainLanguage: "English",
            productionCountry: "Canada",
            ageRating: "PG-13",
            runtime: 145,
            poster: "https://example.com/galactic_frontier.jpg",
            shortDescription: "A group of explorers venture into deep space.",
            additionalInfo: "Realistic sci-fi with scientific accuracy.",
            interestingFacts: "NASA consulted on space travel scenes.",
            genres: ["Sci-Fi", "Adventure"]
        }
    ];

    for (const movie of movies) {
        await prisma.movie.create({
            data: {
                title: movie.title,
                rating: movie.rating,
                releaseYear: movie.releaseYear,
                mainLanguage: movie.mainLanguage,
                productionCountry: movie.productionCountry,
                ageRating: movie.ageRating,
                runtime: movie.runtime,
                poster: movie.poster,
                shortDescription: movie.shortDescription,
                additionalInfo: movie.additionalInfo,
                interestingFacts: movie.interestingFacts,
                genres: {
                    connectOrCreate: await Promise.all(
                        movie.genres.map(async (name) => {
                            const existingGenre = await prisma.genre.findFirst({ where: { name } });
                            return existingGenre
                                ? { where: { id: existingGenre.id }, create: { name } }
                                : { where: { id: -1 }, create: { name } }; // id -1 для создания нового жанра
                        })
                    )
                }
            }
        });
    }
}

main()
  .then(async () => {
    console.log("Seed успешно выполнен!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Ошибка при выполнении сидов:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
