import { Router } from "express";
import { MediaController } from "../controllers/MediaController";
import { SearchResultCacheRepository } from "../repositories/SearchResultCacheRepository";
import { database } from "../databases/sqlite";

export const mediaRouter = Router()

const searchResultsCacheRepository = new SearchResultCacheRepository(database)

const mediaController = new MediaController(searchResultsCacheRepository)

mediaRouter.get('/youtube/get/:videoId', mediaController.getMediaByYoutubeId.bind(mediaController))

mediaRouter.get('/youtube/search/:query', mediaController.searchMediaOnYoutube.bind(mediaController))