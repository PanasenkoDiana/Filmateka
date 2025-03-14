import { Prisma } from '@prisma/client'

export type IUser = Prisma.UserGetPayload<{}>
export type ICreateUser = Prisma.UserCreateInput