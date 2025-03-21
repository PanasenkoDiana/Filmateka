import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movieGenresSelect = [
    "Action", "Adventure", "Crime", "Drama", "Fantasy",
    "History", "Mystery", "Romance", "Sci-Fi", "Thriller", "War"
];

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
    },
    {
        title: "The Crimson Heist",
        rating: 8.2,
        releaseYear: 2023,
        mainLanguage: "English",
        productionCountry: "UK",
        ageRating: "R",
        runtime: 125,
        poster: "https://example.com/crimson_heist.jpg",
        shortDescription: "Master thieves plan the ultimate museum robbery.",
        additionalInfo: "High-stakes action with plot twists.",
        interestingFacts: "Inspired by real heists.",
        genres: ["Crime", "Action"]
    },
    {
        title: "Echoes of Eternity",
        rating: 9.1,
        releaseYear: 2025,
        mainLanguage: "French",
        productionCountry: "France",
        ageRating: "PG",
        runtime: 140,
        poster: "https://example.com/echoes_eternity.jpg",
        shortDescription: "Two lovers transcend time to reunite.",
        additionalInfo: "A romantic tale with fantasy elements.",
        interestingFacts: "Filmed across historic European sites.",
        genres: ["Romance", "Fantasy", "Drama"]
    },
    {
        title: "Desert Mirage",
        rating: 7.9,
        releaseYear: 2022,
        mainLanguage: "Arabic",
        productionCountry: "UAE",
        ageRating: "PG-13",
        runtime: 120,
        poster: "https://example.com/desert_mirage.jpg",
        shortDescription: "An archaeologist uncovers a lost city in the desert.",
        additionalInfo: "Adventure with historical significance.",
        interestingFacts: "Based on Bedouin legends.",
        genres: ["Adventure", "History"]
    },
    {
        title: "Cyber Nexus",
        rating: 8.7,
        releaseYear: 2024,
        mainLanguage: "English",
        productionCountry: "USA",
        ageRating: "R",
        runtime: 135,
        poster: "https://example.com/cyber_nexus.jpg",
        shortDescription: "Hackers battle AI to save humanity.",
        additionalInfo: "Futuristic cyber-thriller.",
        interestingFacts: "Used cutting-edge VFX.",
        genres: ["Sci-Fi", "Thriller"]
    },
    {
        title: "Fallen Empire",
        rating: 8.3,
        releaseYear: 2023,
        mainLanguage: "Italian",
        productionCountry: "Italy",
        ageRating: "R",
        runtime: 150,
        poster: "https://example.com/fallen_empire.jpg",
        shortDescription: "A Roman general faces betrayal and vengeance.",
        additionalInfo: "Epic historical drama.",
        interestingFacts: "Filmed in Rome's Colosseum.",
        genres: ["History", "Drama", "War"]
    },
    {
        title: "Twilight Sonata",
        rating: 8.0,
        releaseYear: 2022,
        mainLanguage: "German",
        productionCountry: "Germany",
        ageRating: "PG",
        runtime: 115,
        poster: "https://example.com/twilight_sonata.jpg",
        shortDescription: "A pianist finds love through music.",
        additionalInfo: "Romantic musical drama.",
        interestingFacts: "Features original compositions.",
        genres: ["Romance", "Drama"]
    },
    {
        title: "Phantom Protocol",
        rating: 8.4,
        releaseYear: 2025,
        mainLanguage: "English",
        productionCountry: "USA",
        ageRating: "PG-13",
        runtime: 125,
        poster: "https://example.com/phantom_protocol.jpg",
        shortDescription: "An agent uncovers a global conspiracy.",
        additionalInfo: "Action-packed spy thriller.",
        interestingFacts: "Shot in 5 countries.",
        genres: ["Action", "Thriller"]
    },
    {
        title: "Dreamscape",
        rating: 8.6,
        releaseYear: 2024,
        mainLanguage: "English",
        productionCountry: "Australia",
        ageRating: "PG-13",
        runtime: 135,
        poster: "https://example.com/dreamscape.jpg",
        shortDescription: "Explorers travel through dreams to solve crimes.",
        additionalInfo: "Mind-bending visuals.",
        interestingFacts: "Inspired by lucid dreaming.",
        genres: ["Fantasy", "Mystery", "Sci-Fi"]
    },
    {
        title: "Shattered Vows",
        rating: 7.8,
        releaseYear: 2023,
        mainLanguage: "Spanish",
        productionCountry: "Spain",
        ageRating: "R",
        runtime: 110,
        poster: "https://example.com/shattered_vows.jpg",
        shortDescription: "A couple faces secrets that threaten their marriage.",
        additionalInfo: "Emotional and intense drama.",
        interestingFacts: "Won best screenplay at film festival.",
        genres: ["Drama", "Romance"]
    },
    {
        title: "Frozen Tundra",
        rating: 8.1,
        releaseYear: 2025,
        mainLanguage: "Russian",
        productionCountry: "Russia",
        ageRating: "PG-13",
        runtime: 140,
        poster: "https://example.com/frozen_tundra.jpg",
        shortDescription: "Survivors fight nature in the Siberian wilderness.",
        additionalInfo: "Based on true events.",
        interestingFacts: "Shot in extreme conditions.",
        genres: ["Adventure", "Drama", "Thriller"]
    },
    {
        title: "Silent Justice",
        rating: 8.3,
        releaseYear: 2024,
        mainLanguage: "English",
        productionCountry: "USA",
        ageRating: "PG-13",
        runtime: 125,
        poster: "https://example.com/silent_justice.jpg",
        shortDescription: "A lawyer seeks justice in a corrupt system.",
        additionalInfo: "Legal drama with suspense.",
        interestingFacts: "Inspired by true cases.",
        genres: ["Crime", "Drama", "Mystery"]
    },
    {
        title: "Legends Reborn",
        rating: 9.0,
        releaseYear: 2026,
        mainLanguage: "English",
        productionCountry: "New Zealand",
        ageRating: "PG-13",
        runtime: 160,
        poster: "https://example.com/legends_reborn.jpg",
        shortDescription: "Heroes unite to battle a rising evil.",
        additionalInfo: "Epic fantasy adventure.",
        interestingFacts: "Used practical effects and CGI.",
        genres: ["Fantasy", "Adventure", "Action"]
    }
];

async function main() {
    for (const genre of movieGenresSelect) {
        const existing = await prisma.genre.findFirst({ where: { name: genre } });
        if (!existing) {
            await prisma.genre.create({ data: { name: genre } });
        }
    }

    const allGenres = await prisma.genre.findMany();
    const genreMap: { [name: string]: number } = {};
    for (const genre of allGenres) {
        genreMap[genre.name] = genre.id;
    }

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
                    connect: movie.genres.map(name => ({ id: genreMap[name] }))
                }
            }
        });
    }
}

main()
    .then(async () => {
        console.log("Сид завершён");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("Ошибка при выполнении сида");
        await prisma.$disconnect();
        process.exit(1);
    });
