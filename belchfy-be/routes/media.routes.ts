import { Router } from "express";
import { MediaController } from "../controllers/MediaController";
import { SearchResultCacheRepository } from "../repositories/SearchResultCacheRepository";
import { database } from "../databases/sqlite";
import { StreamCacheRepository } from "../repositories/StreamCacheRepository";

export const mediaRouter = Router()

const searchResultsCacheRepository = new SearchResultCacheRepository(database)

const streamCacheRepository = new StreamCacheRepository(database)

const mediaController = new MediaController(searchResultsCacheRepository, streamCacheRepository)

mediaRouter.get('/youtube/get/:videoId', mediaController.getMediaByYoutubeId.bind(mediaController))

mediaRouter.get('/youtube/search/:query', mediaController.searchMediaOnYoutube.bind(mediaController))