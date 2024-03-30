import { Request, Response } from "express";
import { getAudioStreamsByVideoId, searchInYoutube } from "../providers/PyProvider";
import { ISearchResultCacheRepository } from "../repositories/interfaces/ISearchResultCache";

export class MediaController{
    constructor(
        private searchResultsCacheRepository: ISearchResultCacheRepository
    ){}

    async getMediaByYoutubeId(request: Request, response: Response): Promise<void>{
        try{
            const {videoId} = request.params

            if(!videoId){
                response.status(400).json({
                    title: "Error geting media by youtube id",
                    detail: "You did not provided the API with an youtube video id",
                    status: 400,
                    instance: request.path
                })
                return;
            }

           if(!videoId.match(/([0-9A-Za-z_-]{11}).*/g)){
                response.status(400).json({
                    title: "Error geting media by youtube id",
                    detail: "The id you provided does not match: ([0-9A-Za-z_-]{11}).*",
                    status: 400,
                    instance: request.path
                })

                return;
           }

           const streams = await getAudioStreamsByVideoId(videoId);

           response.json(streams)

        } catch(error) {
            console.log(error)
            response.status(500).json({
                title: "Error geting media by youtube id",
                detail: "An unkown error has been catched, see logs for more info",
                status: 500,
                instance: request.path
            })
        }
    }

    async searchMediaOnYoutube(request: Request, response: Response): Promise<void>{
        try {
            
            const { query } = request.params

            if(!query){
                response.status(400).json({
                    title: "Error searching for media on Youtube",
                    detail: "You did not provided the API with an query to search",
                    status: 400,
                    instance: request.path
                })
                return;
            }

            const resultInCache =
                await this.searchResultsCacheRepository
                    .getCachedSearchResultByQuery(query)


            console.log('Cache:')
            console.log(resultInCache.length)
            if(resultInCache.length) {
                response.status(200).json(resultInCache)
                return
            }

            const results = await searchInYoutube(query)

            response.status(200).json(results)
            
            this.searchResultsCacheRepository.createSearchCache(results, query)

            return;
        } catch (error) {
            console.log(error)
            response.status(500).json({
                title: "Error searching for media on Youtube",
                detail: "An unkown error has been catched, see logs for more info",
                status: 500,
                instance: request.path
            })           
        }
    }
}