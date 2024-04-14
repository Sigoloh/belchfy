import { Request, Response } from "express";
import { IPlaylistRepository } from "../repositories/interfaces/IPlaylistRepository";
import { getPlaylistFromYoutube } from "../providers/PyProvider";

export class PlaylistController{
    constructor(
        private playlistRepository: IPlaylistRepository
    ){}

    async getPlaylist(request: Request, response: Response): Promise<void>{
        try {
            const {playlistId} = request.params 

            if(!playlistId){
                response.status(400).json({
                    title: "Error geting playlist by playlistId",
                    detail: "You did not provided the API with an youtube playlist id",
                    status: 400,
                    instance: request.path
                })

                return;
            }

            const localPlaylist = await this.playlistRepository.getPlaylistByPlaylistId(playlistId)

            if(localPlaylist){
                response.json(localPlaylist)
                return;
            }

            const externalPlaylist = await getPlaylistFromYoutube(playlistId);

            response.json(externalPlaylist);

            this.playlistRepository.createPlaylist(externalPlaylist)

            return;
        } catch (error) {
            response.status(500).json({
                title: "Error searching for playlist on Youtube",
                detail: "An unkown error has been catched, see logs for more info",
                status: 500,
                instance: request.path
            })
            return;
        }
    }

    async updatePlaylistVideos(request: Request, response: Response): Promise<void>{
        try {
           const {playlistId} = request.params

           const externalPlaylist = await getPlaylistFromYoutube(playlistId)

           await this.playlistRepository.updatePlaylistByPlaylistId(playlistId, externalPlaylist)

           response.status(200).send()
        } catch (error) {
            response.status(500).json({
                title: "Error updating playlist from youtube",
                detail: "An unkown error has been catched, see logs for more info",
                status: 500,
                instance: request.path
            })
            return;
        }
    }

    async getAllPlaylists(request: Request, response: Response): Promise<void>{
        try {
            const results = await this.playlistRepository.getAllPlaylists();

            if(!results){
                response.status(204).json({
                    title: "Error geting playlists",
                    detail: "No playlist found",
                    status: 204,
                    instance: request.path
                })

                return;
            }

            response.status(200).json(results)
        } catch (error) {
            response.status(500).json({
                title: "Error searching for playlist on Youtube",
                detail: "An unkown error has been catched, see logs for more info",
                status: 500,
                instance: request.path
            })
            console.log(error)
            return;   
        }
    }
}