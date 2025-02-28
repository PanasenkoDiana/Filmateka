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
    "Actor",
    "Director"
]

async function main() {
    // for (let i = 0; i < movieGenresSelect.length; i++) {
    //     await Prisma.genre.create({
    //         data: {
    //             name: movieGenresSelect[i]
    //         }
    //     })
    // }

    // for (let i = 0; i < personRoles.length; i++) {
    //     await Prisma.personRole.create({
    //         data: {
    //             name: personRoles[i]
    //         }
    //     })
    // }


    await Prisma.movie.create({
        data: 
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
            genres: {
                connectOrCreate: [
                    { create: { name: 'War' }, where: { id: 11 } },
                    { create: { name: 'Action' }, where: { id: 1 } }
                ]
            }
        }
    })

    // await Prisma.person.create({
    //     data: {
    //         name: "Dwayne",
    //         surname: "Johnson",
    //         roles: {
    //             connectOrCreate: [
    //                 {
    //                     create: { name: "Actor" },
    //                     where: { id: 1 }
    //                 }
    //             ]
    //         },
    //         photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/279px-Dwayne_Johnson_2%2C_2013.jpg",
    //         description: "Двейн Ду́глас (Ду́ґлас) Джо́нсон (англ. Dwayne Douglas Johnson; нар. 2 травня 1972, Гейвард, Каліфорнія), спортивне та сценічне прізвисько Скеля (англ. The Rock) — американо-канадійський[6] актор, а також відомий реслер. З 1996 року по 2004 рік виступав в World Wrestling Federation/Entertainment (WWF/E). З 2011 року знову працює в WWE, виступаючи в основному на бренді Raw. Є восьмиразовим чемпіоном WWF/E, дворазовим чемпіоном у важкій вазі WCW, дворазовим інтерконтинентальним чемпіоном WWF і п'ятикратним чемпіоном командним WWF. Також є шостим чемпіоном Потрійної корони і переможцем Королівської битви 2000 року.",
    //         movies: {
    //             connect: { id: 1 }
    //         }
    //     }
    // })

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