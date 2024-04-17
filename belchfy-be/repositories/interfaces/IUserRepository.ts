import { User } from "../types/User.types";

export interface IUserRepository{
    createUser(user: User): Promise<User>
    getUserPasswordByUsername(username: string): Promise<string>
    getUserByUsername(username: string): Promise<Omit<User, 'password'>>
}