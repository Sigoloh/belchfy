import { StreamInfo } from "../../providers/types/StreamInfo.type";
import { StreamCache } from "../types/StreamCache.types";

export interface IStreamCacheRepository{
    createStreamCache(streams: StreamInfo[], videoId: string, expiresAt: Date): Promise<boolean>
    getStreamCacheByVideoId(videoId: string):Promise<StreamInfo[] | null>
    getAllOutdatedStreamCache(): Promise<StreamCache[] | null>
    deleteCacheById(id: number): Promise<void>
}