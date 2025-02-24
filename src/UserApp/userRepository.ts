import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()
import { CreateUser } from "../types/types"
import bcrypt from 'bcrypt'

async function getUserById(id: number) {
    try {
        const user = await Prisma.$queryRaw<{ id: number, email: string, password: string }[]>`
            SELECT * FROM "User" WHERE id = ${id}
        `
        return user[0] || null
    } catch (error) {
        console.log("Error getUserById: ", error)
        return null
    }
}

async function createUser(data: CreateUser) {
    try {
        if (!data.email || !data.password) {
            throw new Error('Email and password are required')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const user = await Prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                username: data.username || data.email, // Use provided username or email as fallback
                age: data.age || "18", // Use provided age or default to 18
                role: "USER", // Default role
                profileImage: data.profileImage || null // Optional field
            },
            select: {
                id: true,
                email: true,
                username: true,
                age: true,
                role: true,
                profileImage: true
                // Exclude password from the returned object
            }
        })
        return user
    } catch (error) {
        console.log("Error createUser: ", error)
        return null
    }
}

async function findUserByEmail(email: string) {
    try {
        const user = await Prisma.$queryRaw<{ id: number, email: string, password: string }[]>`
            SELECT * FROM "User" WHERE email = ${email}
        `
        return user[0] || null
    } catch (error) {
        console.log("Error findUserByEmail: ", error)
        return null
    }
}

async function validatePassword(user: any, password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, user.password)
    } catch (error) {
        console.log("Error validatePassword: ", error)
        return false
    }
}

const functions = {
    getUserById,
    createUser,
    findUserByEmail,
    validatePassword
}

export default functions