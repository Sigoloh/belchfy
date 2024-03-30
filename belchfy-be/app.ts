import { server } from "./server";
import * as dotenv from "dotenv"
dotenv.config()

const serverPort = process.env.PROCESS_PORT ?? 4152;

server.listen(serverPort, () => {
    console.log(`App listening at:  ${serverPort}`)
})