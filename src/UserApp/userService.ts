import { Prisma as PrismaInstance } from "../../prisma/prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function loginUser(email: string, password: string) {
    try {
        const user = await PrismaInstance.user.findUnique({ where: { email } });
        if (!user) {
            return { status: 'error', message: 'User not found' };
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return { status: 'error', message: 'Invalid password' };
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return { status: 'success', data: { user, token } };
    } catch (error) {
        console.error("Error loginUser: ", error);
        return { status: 'error', message: 'Login failed' };
    }
}

export async function getAllUsers() {
    try {
        const users = await PrismaInstance.user.findMany();
        return { status: 'success', data: users };
    } catch (error) {
        console.error("Error getAllUsers: ", error);
        return { status: 'error', message: 'Failed to fetch users' };
    }
}

export async function deleteUser(id: number) {
    try {
        await PrismaInstance.user.delete({ where: { id } });
        return { status: 'success', message: 'User deleted' };
    } catch (error) {
        console.error("Error deleteUser: ", error);
        return { status: 'error', message: 'Failed to delete user' };
    }
}

export async function createUser(userData: {
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    age: number;
    role: "USER" | "ADMIN";
}) {
    try {
        if (!userData.username || !userData.email || !userData.password || !userData.age || !userData.role) {
            return { status: 'error', message: 'Invalid user data' };
        }

        const existingUser = await PrismaInstance.user.findUnique({ where: { email: userData.email } });
        if (existingUser) {
            return { status: 'error', message: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await PrismaInstance.user.create({
            data: { ...userData, password: hashedPassword },
        });
        return { status: 'success', data: newUser };
    } catch (error) {
        console.error("Error createUser: ", error);
        return { status: 'error', message: 'Failed to create user' };
    }
}

export async function updateUser(id: number, data: any) {
    try {
        const updatedUser = await PrismaInstance.user.update({
            where: { id },
            data,
        });
        return { status: 'success', data: updatedUser };
    } catch (error) {
        console.error("Error updateUser: ", error);
        return { status: 'error', message: 'Failed to update user' };
    }
}

export default {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
};
