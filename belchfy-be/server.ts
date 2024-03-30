import express from "express";
import { router } from "./routes/index.routes";
import cors from "cors";
import morgan from "morgan"

export const server = express()

server.use(express.json())

server.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'))

server.use(cors())

server.use('/', router)