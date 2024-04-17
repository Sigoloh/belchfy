import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { database } from "../databases/sqlite";
import { UserController } from "../controllers/UserController";

export const userRouter = Router()
const userRepository = new UserRepository(database)
const usercontroller = new UserController(userRepository)

userRouter.post('/create', usercontroller.createUser.bind(usercontroller))

userRouter.post('/login', usercontroller.login.bind(usercontroller))