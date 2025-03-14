import { Prisma } from "@prisma/client"

export interface IError {
    status: 'error'
    message: string
}

export interface ISuccess<T> {
    status:'success'
    data: T
}

export type IImage = Prisma.ImageGetPayload<{}>

export type IComment = Prisma.CommentGetPayload<{}>