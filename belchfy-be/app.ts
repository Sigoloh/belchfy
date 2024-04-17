import { createAdminUser } from "./databases/createAdminUser";
import { database, startDatabase } from "./databases/sqlite";

import { server } from "./server";

import * as dotenv from "dotenv"

dotenv.config()

console.log('[SYSTEM] Starting database')

startDatabase()

createAdminUser()

const serverPort = process.env.PROCESS_PORT ?? 4152;

server.listen(serverPort, () => {
    console.log(`App listening at:  ${serverPort}`)
})