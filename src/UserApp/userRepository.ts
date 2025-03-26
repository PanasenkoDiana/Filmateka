import { Prisma as PrismaInstance } from "../../prisma/prismaClient";
type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    age: string;
    role: "USER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
};

async function getAllUsers(): Promise<User[] | null> {
    try {
        return await PrismaInstance.user.findMany();
    } catch (error) {
        console.error("Error getAllUsers: ", error);
        return null;
    }
}

async function deleteUser(id: number) {
    try {
        await PrismaInstance.user.delete({ where: { id } });
        return { status: 'success', message: 'User deleted' };
    } catch (error) {
        console.error("Error deleteUser: ", error);
        return { status: 'error', message: 'Failed to delete user' };
    }
}

async function createUser(userData: {
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    age: string;
    role: "USER" | "ADMIN";
}): Promise<User | null> {
    try {
        return await PrismaInstance.user.create({ data: userData });
    } catch (error) {
        console.error("Error createUser: ", error);
        return null;
    }
}

async function updateUser(id: number, data: Partial<User>): Promise<User | null> {
    try {
        return await PrismaInstance.user.update({ where: { id }, data });
    } catch (error) {
        console.error("Error updateUser: ", error);
        return null;
    }
}

async function findUserByEmail(email: string): Promise<User | null> {
    try {
        return await PrismaInstance.user.findUnique({ where: { email } });
    } catch (error) {
        console.error("Error findUserByEmail: ", error);
        return null;
    }
}

export default {
    getAllUsers,
    deleteUser,
    createUser,
    updateUser,
    findUserByEmail,
};