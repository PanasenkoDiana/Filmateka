import userRepository from "./userRepository"

import { IError, ISuccess } from "../types/types"
import { IUser, ICreateUser } from './userTypes'

async function getAllUsers(): Promise< IError | ISuccess<IUser[]> > {
    const users = await userRepository.getAllUsers()
    if (!users){
        return { status: 'error', message: `Користувачів не знайдено`}
    }
    return { status: 'success', data: users }
}

async function getUserById(id: number): Promise< IError | ISuccess<IUser> > {
    const user = await userRepository.getUserById(id);
    if (!user){
        return { status: 'error', message: `Користувача не знайдено`}
    }
    return { status: 'success', data: user }
}

async function createUser(data: ICreateUser): Promise< IError | ISuccess<IUser> > {
    const user = await userRepository.createUser(data)
    if (!user) {
        return { status: 'error', message: 'Failed to create user' }
    }
    return { status: 'success', data: user}
}

async function deleteUserById(id: number) {
    await userRepository.deleteUserById(id)
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById
}