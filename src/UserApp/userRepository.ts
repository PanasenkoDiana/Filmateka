import { Prisma } from "../../prisma/prismaClient"
import { CreateUser } from "../types/types"

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
        console.log("Error getUserById: ", error)
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
        console.log("Error createUser: ", error)
    }
}


async function findUserByEmail(email: string){
    try{
        let user = await Prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user;
    } catch(error){
        console.log("Error createUser: ", error)
    }
}

const functions = {
    getUserById: getUserById,
    createUser: createUser,
    findUserByEmail: findUserByEmail,
}

export default functions