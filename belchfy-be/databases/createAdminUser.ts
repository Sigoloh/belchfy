import { hashPassword } from "../providers/AuthenticationProvider"
import { database } from "./sqlite"

export async function createAdminUser(): Promise<void>{
    try {

        console.log('[SYSTEM] Checking admin user')

        const checkAdminQuery = `
            SELECT
                1
            FROM
                users
            WHERE
                admin = 1
        `

        const checkAdminResult = await (
            new Promise((resolve, reject) => {
                database.all(checkAdminQuery, (err: unknown, rows: any[]) => {
                    if(err){
                        reject(err)
                        return;
                    }

                    resolve(rows.length > 0)
                })
            })
        )

        if(checkAdminResult){
            console.log('[SYSTEM] System has one administrator, no creation needed')
            return
        }

        const password = await hashPassword('changeme')

        const createAdminQuery = `
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
                    'admin',
                    '${password}',
                    1,
                    DATETIME('now'),
                    NULL,
                    0,
                    NULL
                )
        `
        await (
            new Promise((resolve, reject) => {
                database.run(createAdminQuery, (err: any) => {
                    if(err){
                        reject(err)
                        return
                    }

                    resolve(true)
                })
            })
        )
        
        console.log('[SYSTEM] Admin user created')
        console.log('username: admin')
        console.log('password: changeme')
    } catch (error) {
        console.log(error)
        throw error
    }
}