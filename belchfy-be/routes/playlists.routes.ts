import { Router } from "express";
import { PlaylistController } from "../controllers/PlaylistController";
import { PlaylistRepository } from "../repositories/PlaylistRepository";
import { database } from "../databases/sqlite";

export const playlistRouter = Router()

const playlistRepository = new PlaylistRepository(database)

const playlistController = new PlaylistController(playlistRepository)

playlistRouter.get('/get/:playlistId', playlistController.getPlaylist.bind(playlistController))

playlistRouter.patch('/update/:playlistId', playlistController.updatePlaylistVideos.bind(playlistController))