import { Prisma } from '@prisma/client'

export type IMovie = Prisma.MovieGetPayload<{}>
export type ICreateMovie = Prisma.MovieCreateInput

export type IRecentlyViewedMovie = Prisma.RecentlyViewedMovieGetPayload<{}>