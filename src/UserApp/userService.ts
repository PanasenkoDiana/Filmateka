import userRepository from "./userRepository"
import { CreateUser, IError, ISuccess, Person, User } from "../types/types"

async function getUserById(id: number): Promise< IError | ISuccess<User> > {
    const movie = await userRepository.getUserById(id);
    if (!movie){
        return { status: 'error', message: `User with id: ${id} not found`}
    }
    return { status: 'success', data: movie }
}

async function createUser(data: CreateUser): Promise< IError | ISuccess<User> > {
    const newUser = await userRepository.createUser(data)
    if (!newUser) {
        return { status: 'error', message: 'Failed to create user' }
    }
    return { status: 'success', data: newUser}
}

const functions = {
    getUserById: getUserById,
    createUser: createUser
}

export default functions