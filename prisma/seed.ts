import { PersonRole, Role } from "@prisma/client";
import { Prisma } from "./prismaClient"

const movieGenresSelect = [
    "Action",
    "Adventure",
    "Crime",
    "Drama",
    "Fantasy",
    "History",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War"
];

const personRoles = [
    "ACTOR",
    "DIRECTOR",
]

async function main() {
    for (let i = 0; i < movieGenresSelect.length; i++) {
        await Prisma.genre.create({
            data: {
                name: movieGenresSelect[i]
            }
        })
    }

    await Prisma.personRole.createMany({
        data: [
            { role: Role.ACTOR },
            { role: Role.DIRECTOR }
        ],
    })

    await Prisma.movie.create({
        data: {
            title: "The Film",
            rating: 4.9,
            releaseYear: 2014,
            mainLanguage: "English",
            productionCountry: "USA",
            ageRating: "PG-13",
            runtime: 142,
            poster: "https://www.sonypictures.co.uk/sites/unitedkingdom/files/styles/max_n_x_365_/public/2024-10/2481_SP_VENOM_POSTER_1-Sheet_OutNow.jpg?itok=cyDlYZBK",
            shortDescription: "The film description",
            additionalInfo: "no additional info",
            interestingFacts: "no facts",
            genres: {
                connectOrCreate: [
                    {
                        create: { name: 'Action' },
                        where: { id: 1 },
                    },
                    {
                        create: { name: 'History' },
                        where: { id: 6 },
                    }
                ]
            }
        }
    })

    await Prisma.person.create({
        data: {
            name: "Dwayne",
            surname: "Johnson",
            roles: {
                connectOrCreate: [
                    {
                        create: { role: Role.ACTOR },
                        where: { id: 1 },
                    }
                ]
            },
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/279px-Dwayne_Johnson_2%2C_2013.jpg",
            description: "Двейн Ду́глас (Ду́ґлас) Джо́нсон (англ. Dwayne Douglas Johnson; нар. 2 травня 1972, Гейвард, Каліфорнія), спортивне та сценічне прізвисько Скеля (англ. The Rock) — американо-канадійський[6] актор, а також відомий реслер. З 1996 року по 2004 рік виступав в World Wrestling Federation/Entertainment (WWF/E). З 2011 року знову працює в WWE, виступаючи в основному на бренді Raw. Є восьмиразовим чемпіоном WWF/E, дворазовим чемпіоном у важкій вазі WCW, дворазовим інтерконтинентальним чемпіоном WWF і п'ятикратним чемпіоном командним WWF. Також є шостим чемпіоном Потрійної корони і переможцем Королівської битви 2000 року.",
            movies: {
                connect: { id: 1 }
            }
        }
    })

}

main()
  .then(async () => {
    await Prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await Prisma.$disconnect()
    process.exit(1)
})