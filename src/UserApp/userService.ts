import userRepository from "./userRepository"
import { CreateUser, IError, ISuccess, User } from "../types/types"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = '7d'; // Token expires in 7 days

async function getUserById(id: number): Promise< IError | ISuccess<User> > {
    const user = await userRepository.getUserById(id);
    if (!user){
        return { status: 'error', message: `User with id: ${id} not found`}
    }
    const { password, ...userWithoutPassword } = user;
    return { status: 'success', data: userWithoutPassword as User }
}

async function createUser(data: CreateUser): Promise<IError | ISuccess<{token: string, user: Omit<User, 'password'>}>> {
    // Validate email format
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return { status: 'error', message: 'Invalid email format' }
    }

    // Validate password
    if (!data.password || data.password.length < 6) {
        return { status: 'error', message: 'Password must be at least 6 characters long' }
    }

    // Check if user already exists
    const existingUser = await userRepository.findUserByEmail(data.email)
    if (existingUser) {
        return { status: 'error', message: 'Email already registered' }
    }

    const newUser = await userRepository.createUser(data)
    if (!newUser) {
        return { status: 'error', message: 'Failed to create user' }
    }

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    const { password, ...userWithoutPassword } = newUser as User;

    return {
        status: 'success',
        data: {
            token,
            user: userWithoutPassword as Omit<User, 'password'>
        }
    }
}

async function loginUser(email: string, password: string): Promise< IError | ISuccess<{token: string, user: Omit<User, 'password'>}> > {
    if (!email || !password) {
        return { status: 'error', message: 'Email and password are required' }
    }

    const user = await userRepository.findUserByEmail(email)
    if (!user) {
        return { status: 'error', message: 'Invalid email or password' }
    }

    const isValidPassword = await userRepository.validatePassword(user, password)
    if (!isValidPassword) {
        return { status: 'error', message: 'Invalid email or password' }
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    const { password: _, ...userWithoutPassword } = user;

    return { status: 'success', data: { token, user: userWithoutPassword } }
}

async function getCurrentUser(userId: number): Promise< IError | ISuccess<Omit<User, 'password'>> > {
    const user = await userRepository.getUserById(userId)
    if (!user) {
        return { status: 'error', message: 'User not found' }
    }

    const { password, ...userWithoutPassword } = user;
    return { status: 'success', data: userWithoutPassword }
}

const functions = {
    getUserById,
    createUser,
    loginUser,
    getCurrentUser
}

export default functions