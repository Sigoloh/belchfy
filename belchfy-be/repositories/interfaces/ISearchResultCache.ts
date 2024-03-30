import { YoutubeSearchResult } from "../../providers/types/YoutubeSearchResult.type";

export interface ISearchResultCacheRepository {
    getCachedSearchResultByQuery(query: string): Promise<YoutubeSearchResult[]>
    createSearchCache(results: YoutubeSearchResult[], query: string): Promise<boolean>
}