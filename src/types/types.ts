import { Prisma } from "@prisma/client"

export interface IError {
    status: 'error';
    message: string;
}

export interface ISuccess<T> {
    status:'success';
    data: T;
}

export type Genre = Prisma.GenreGetPayload<{}>

export type Image = Prisma.ImageGetPayload<{}>

export type Person = Prisma.PersonGetPayload<{}>

export type Movie = Prisma.MovieGetPayload<{}>

export type RecentlyViewedMovie = Prisma.RecentlyViewedMovieGetPayload<{}>

export type UserReview = Prisma.UserReviewGetPayload<{}>

export type User = Prisma.UserGetPayload<{}>