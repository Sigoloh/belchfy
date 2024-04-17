import { Request, Response } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { isUser } from "../repositories/types/User.types";
import { compareHashWithPassword } from "../providers/AuthenticationProvider";

export class UserController{
    constructor(
        private userRepository: IUserRepository
    ){}

    async createUser(request: Request, response: Response){
        try {
            const { body } = request

            console.log(body)
            if(!isUser(body)){
                response.status(400).json({
                    title: "Error creting user",
                    detail: "You did not provided a valid User object, check documentation",
                    status: 400,
                    instance: request.path
                })
                return;
            }

            const result = await this.userRepository.createUser(body)            

            response.status(201).json(result)
        } catch (error) {
            response.status(500).json({
                title: "Error creating User",
                detail: "An unkown error has been catched, see logs for more info",
                status: 500,
                instance: request.path
            })
            return;
        }
    }

    async login(request: Request, response: Response){
        try {
            const {username, password} = request.body    

            if(typeof username !== 'string' || typeof password !== 'string'){
                response.status(400).json({
                    title: "Error while login",
                    detail: "Username and Password must be strings",
                    status: 400,
                    instance: request.path
                })
                return
            }

            const registeredPassword = await this.userRepository.getUserPasswordByUsername(username)

            if(!registeredPassword){
                response.status(401).json({
                    title: "Error while login",
                    detail: "Username or password incorrect",
                    status: 401,
                    instance: request.path
                })
                return;
            }

            const result = await compareHashWithPassword(registeredPassword, password)

            if(!result){
                response.status(401).json({
                    title: "Error while login",
                    detail: "Username or password incorrect",
                    status: 401,
                    instance: request.path
                })
                return;
            }

            console.log(result)

            response.status(200).json({
                result: result
            })
        } catch (error) {
            console.log(error)
            response.status(500).json({
                title: "Error creating User",
                detail: "An unkown error has been catched, see logs for more info",
                status: 500,
                instance: request.path
            })
            return;           
        }
    }
}