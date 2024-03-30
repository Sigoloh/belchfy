import { Database } from "sqlite3";
import { YoutubeSearchResult } from "../providers/types/YoutubeSearchResult.type";
import { ISearchResultCacheRepository } from "./interfaces/ISearchResultCache";

const SEARCH_CACHE_TIME = process.env.SEARCH_CACHE_TIME ? parseInt(process.env.SEARCH_CACHE_TIME) : 5

export class SearchResultCacheRepository implements ISearchResultCacheRepository{
    constructor(
        private database: Database
    ) {}

    async getCachedSearchResultByQuery(query: string): Promise<YoutubeSearchResult[]>{
        try {
            const sqlQuery = `
                SELECT
                    *
                FROM 
                    search_cache sc
                WHERE
                    sc.[query] = '${query}' AND
                    sc.expire_at > DATETIME('now')
            `
            const queryPromise: any[] = await (
                new Promise((resolve, reject) => {
                    this.database.all(sqlQuery, (error: any, rows: any[]) => {
                        if(error){
                            reject(error)
                            return;
                        }

                        resolve(rows)
                    })
                })
            )

            if(!queryPromise.length){
                return []
            }
            
            const parsedCache: YoutubeSearchResult[] = 
                queryPromise.map((element: any) => {
                    return JSON.parse(element.results)
                })

            return parsedCache
        } catch (error) {
            throw error
        }
    }

    async createSearchCache(results: YoutubeSearchResult[], query: string): Promise<boolean>{
        try {
            const expire_at = new Date()

            expire_at.setHours(expire_at.getHours() + SEARCH_CACHE_TIME);

            const sqlQuery = `
                INSERT INTO
                    search_cache
                    (
                        query,
                        results,
                        expire_at
                    )
                VALUES
                    (
                        '${query}',
                        '${JSON.stringify(results)}',
                        DATETIME('${expire_at.toISOString()}')
                    );
            `

            const databasePromise: boolean = await (
                new Promise((resolve, reject) => {
                    this.database.run(sqlQuery, (error: any) => {
                        if(error){
                            reject(error)
                            return;
                        }

                        resolve(true)
                    })
                })
            )

            return databasePromise
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}