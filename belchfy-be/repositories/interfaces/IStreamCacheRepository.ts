import { StreamInfo } from "../../providers/types/StreamInfo.type";

export interface IStreamCacheRepository{
    createStreamCache(streams: StreamInfo[], videoId: string, expiresAt: Date): Promise<boolean>
    getStreamCacheByVideoId(videoId: string):Promise<StreamInfo[] | null>
}