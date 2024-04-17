import { Database } from "sqlite3";
import { User } from "./types/User.types";
import { hashPassword } from "../providers/AuthenticationProvider";
import { rejects } from "assert";
import e from "express";
import { unlink } from "fs";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository{
    constructor(
        private database: Database
    ){}

    async createUser(user: User): Promise<User>{
        try {

            const hashedPassword = await hashPassword(user.password)

            const query = `
                INSERT INTO
                    users(
                        username,
                        password,
                        admin,
                        created_at,
                        last_updated,
                        deleted,
                        deleted_at
                    )
                VALUES (
                    '${user.username}',
                    '${hashedPassword}',
                    ${user.admin},
                    DATETIME('now'),
                    NULL,
                    0,
                    NULL
                )
            `

            const queryResult = await (new Promise((resolve, reject) => {
                this.database.run(query, (err: unknown) => {
                    if(err){
                        reject(err)
                        return
                    }

                    resolve(user)
                })
            })) as User

            return queryResult
        } catch (error) {
           console.log(error) 
           throw error

        }
    }

    async getUserPasswordByUsername(username: string): Promise<string>{
        try {
            const query = `
                SELECT
                    password
                FROM
                    users
                WHERE
                    username = '${username}'
            `

            const queryResult = await (
                new Promise((resolve, reject) => {
                    this.database.all(query, (err: unknown, rows: any[]) => {
                        if(err){
                            reject(err)
                            return
                        }

                        resolve(rows)
                    })
                })
            ) as User[]

            if(queryResult.length === 0){
                return ''
            }

            return queryResult[0].password
        } catch (error) {
            console.log(error)        
            throw error
        }
    }

    async getUserByUsername(username: string): Promise<Omit<User, 'password'>>{
        try {
            const query = `
                SELECT
                    *
                FROM
                    users
                WHERE
                    username =  '${username}'
            `

            const queryResult = await (
                new Promise((resolve, reject) => {
                    this.database.all(query, (err: unknown, rows: any[]) => {
                        if(err){
                            reject(err)
                            return;
                        }

                        const parsedResults: Omit<User, 'password'>[] = rows.map((row: any) => {
                            return {
                                username: row.username,
                                admin: row.admin,
                                createdAt: row.created_at,
                                lastUpdated: row.last_updated,
                                deleted: row.deleted,
                                deletedAt: row.deleted_at
                            }
                        })

                        resolve(parsedResults[0])
                    })
                })
            ) as Omit<User, 'password'>

            return queryResult
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}