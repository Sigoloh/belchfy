import { Router } from "express";
import { MediaController } from "../controllers/MediaController";

export const mediaRouter = Router()
const mediaController = new MediaController()

mediaRouter.get('/youtube/get/:videoId', mediaController.getMediaByYoutubeId.bind(mediaController))

mediaRouter.get('/youtube/search/:query', mediaController.searchMediaOnYoutube.bind(mediaController))