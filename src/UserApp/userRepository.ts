import { Prisma } from "../../prisma/prismaClient"
import { CreateUser } from "../types/types"

async function getAllUsers() {
    try {
        const users = await Prisma.user.findMany()
        console.log(users)
        return users
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(id: number) {
    try {
        const user = await Prisma.user.findUnique({
            where: {
                id: id
            }
        })
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

async function createUser(data: CreateUser) {
    try {
        const user = await Prisma.user.create({
            data: data
        })
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

async function deleteUser(id: number) {
    try {
        const user = await Prisma.user.delete({
            where: {
                id: id
            }
        })
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

const functions = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser
}

export default functions