import axios from "axios";
import { StreamInfo } from "./types/StreamInfo.type";
import { YoutubeSearchResult } from "./types/YoutubeSearchResult.type";
import { SearchResultCacheRepository } from "../repositories/SearchResultCacheRepository";
import { database } from "../databases/sqlite";
import { Playlist } from "../repositories/types/Playlist.types";
import { resolve } from "path";

export const pyClient = axios.create({
        baseURL: process.env.PY_URL ?? 'http://127.0.0.1:5000'
})

export async function getAudioStreamsByVideoId(videoId: string): Promise<StreamInfo[]>{
    try {
        const response = await pyClient.get(`/youtube/streams/${videoId}`)

        if(response.status === 200){
            const streams = response.data.map((element: any) => {
                return {
                    abr: element.abr,
                    codec: element.codec,
                    expiresInSeconds: element.expires_in_seconds,
                    expiresAt: new Date(
                        (new Date()).getTime() + 
                        (parseInt(element.expires_in_seconds) * 1000)),
                    fileSize: element.file_size,
                    mimeType: element.mime_type,
                    title: element.title,
                    url: element.url
                } as StreamInfo
            })

            return streams
        }

        return []
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function searchInYoutube(query: string): Promise<YoutubeSearchResult[]>{
    try{

        const response = await pyClient.get(`/youtube/search/${query}`)

        if(response.status === 200){
            const results = response.data.map((element: any) => {
                return {
                    author: element.author,
                    channelId: element.channel_id,
                    lenght: element.lenght,
                    thumbnail: element.thumbnail,
                    title: element.title,
                    videoId: element.video_id,
                    views: element.views,
                    belchfyURL: element.belchfy_url
                } as YoutubeSearchResult
            })

            return results
        }

        return []
    }catch(error){
        console.log(error)
        throw error
    }

}

export async function getPlaylistFromYoutube(playlistid: string): Promise<Playlist>{
    try {
        const response = await pyClient.get(`/youtube/playlist/get/${playlistid}`)

        if(response.status == 200){
            return {
                belchfyUrl: response.data.belchfy_url,
                owner: response.data.owner,
                playlistId: response.data.playlist_id,
                title: response.data.title,
                videos: response.data.videos as YoutubeSearchResult[],
                createdAt: new Date(),
                lastUpdated: new Date()
            } as Playlist
        }

        return {} as Playlist
    } catch (error) {
        console.log(error)
        throw error 
    }
}