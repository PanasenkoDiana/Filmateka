import { Prisma } from '@prisma/client'

export type ICreateMovie = Prisma.MovieCreateInput
export type IMovie = Prisma.MovieGetPayload<{}>