import { Prisma } from "@prisma/client"

export interface IError {
    status: 'error'
    message: string
}

export interface ISuccess<T> {
    status:'success'
    data: T
}

export type Genre = Prisma.GenreGetPayload<{}>

export type Image = Prisma.ImageGetPayload<{}>

export type Person = Prisma.PersonGetPayload<{}>

export type Movie = Prisma.MovieGetPayload<{}>

export type RecentlyViewedMovie = Prisma.RecentlyViewedMovieGetPayload<{}>

export type Comment = Prisma.CommentGetPayload<{}>

export type User = Prisma.UserGetPayload<{}>

export type CreateUser = Prisma.UserCreateManyInput