import { Request,Response, Router } from "express";
import { mediaRouter } from "./media.routes";
import { playlistRouter } from "./playlists.routes";

export const router = Router()

router.get('/ping', (request: Request, response: Response) => {
    response.status(200).send("pong")
})

router.use('/media', mediaRouter)

router.use('/playlists', playlistRouter)