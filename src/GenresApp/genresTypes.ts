import { Prisma } from '@prisma/client'

export type IGenre = Prisma.GenreGetPayload<{}>
export type ICreateGenre = Prisma.GenreCreateInput