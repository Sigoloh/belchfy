import { YoutubeSearchResult } from "../../providers/types/YoutubeSearchResult.type";

export type Playlist = {
    id?: number,
    belchfyUrl: string,
    owner: string,
    playlistId: string,
    title: string,
    videos: YoutubeSearchResult[], 
    createdAt: Date,
    lastUpdated?: Date
}