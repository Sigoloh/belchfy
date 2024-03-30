import * as sqlite3 from 'sqlite3'
import fs from 'fs'

export const database = new sqlite3.Database('database.db')

export function startDatabase(){
    const tables = fs.readdirSync('./databases/tables').filter((element: string) => {
        return element.endsWith('.sql')
    })

    tables.forEach((file: string) => {
        console.log('[SYSTEM] Creating table as descripted in: ' + file)
        const query = fs.readFileSync(`./databases/tables/${file}`).toString()
        database.run(query, (err: any) => {
            if(err){
                console.log('[SYSTEM] Error running sql from ' + file)
                console.log(err)
            } else {
                console.log(`[SYSTEM] Query from ${file} succefully run`)
            }
        })
    })
}
