import { Prisma } from '@prisma/client'

export type IPerson = Prisma.PersonGetPayload<{}>
export type ICreatePerson = Prisma.PersonCreateInput