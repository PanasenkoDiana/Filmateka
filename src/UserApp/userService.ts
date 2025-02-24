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

async function authUser(email: string): Promise< IError | ISuccess<User> >{
    let user = await userRepository.findUserByEmail(email);

    if (!user){
        return {status: 'error', message: 'user not found'};
    }
    
    // if (user.password != password){
    //     return {status: 'error', message: 'nepravilniy password'};
    // }

    return {status: 'success', data: user};
}


const functions = {
    getUserById: getUserById,
    createUser: createUser,
    authUser: authUser
}

export default functions