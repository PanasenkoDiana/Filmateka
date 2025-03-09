import userRepository from "./userRepository"
import { CreateUser, IError, ISuccess, Person, User } from "../types/types"

async function getAllUsers(): Promise< IError | ISuccess<User[]> > {
    const users = await userRepository.getAllUsers();
    if (!users){
        return { status: 'error', message: `Users not found`}
    }
    return { status: 'success', data: users }
}

async function getUserById(id: number): Promise< IError | ISuccess<User> > {
    const user = await userRepository.getUserById(id);
    if (!user){
        return { status: 'error', message: `User with id: ${id} not found`}
    }
    return { status: 'success', data: user }
}

async function createUser(data: CreateUser): Promise< IError | ISuccess<User> > {
    const user = await userRepository.createUser(data)
    if (!user) {
        return { status: 'error', message: 'Failed to create user' }
    }
    return { status: 'success', data: user}
}

async function deleteUser(id: number): Promise< IError | ISuccess<string> > {
    const user = await userRepository.deleteUser(id)
    if (user) {
        return { status: 'error', message: 'Failed to delete user' }
    }
    return { status: 'success', data: 'Successfully deleted user' }
}


const functions = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser
}

export default functions