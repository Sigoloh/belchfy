import exp from "constants";
import { StreamInfo } from "../providers/types/StreamInfo.type";
import { StreamCache } from "./types/StreamCache.types";
import { Database } from "sqlite3";
import { IStreamCacheRepository } from "./interfaces/IStreamCacheRepository";
import { Stream } from "stream";

export class StreamCacheRepository implements IStreamCacheRepository{
    constructor(
        private database: Database
    ){}

    async createStreamCache(streams: StreamInfo[], videoId: string, expiresAt: Date): Promise<boolean>{
        try {
            const query = `
                INSERT INTO 
                    stream_cache (
                        belchfy_url,
                        video_id,
                        results,
                        expires_at
                    )
                VALUES
                    (
                        '',
                        '${videoId}',
                        '${JSON.stringify(streams)}',
                        '${expiresAt.toISOString()}'
                    );
            `
            
            const databasePromise: boolean = await (
                new Promise((resolve, reject) => {
                    this.database.run(query, (err) => {
                        if(err){
                            reject(err)
                            return;
                        }

                        resolve(true)
                    })
                })
            )

            return databasePromise
        } catch (error) {
            console.log(error)
            throw error
        }
    }    

    async getStreamCacheByVideoId(videoId: string): Promise<StreamInfo[] | null> {
        try {
           const query = `
                SELECT
                    *
                FROM
                    stream_cache
                WHERE
                    video_id = '${videoId}' AND
                    expires_at > DATETIME('${(new Date()).toISOString()}')
           ` 

           const databasePromise: StreamCache[] = await (
                new Promise((resolve, reject) => {
                    this.database.all(query, (error: any, rows: any[]) => {
                        if(error){
                            reject(error)
                            return;
                        }

                        resolve(rows)
                    })
                })
           )

           if(!databasePromise.length){
                return null
           }

           const cachedStream = JSON.parse(databasePromise[0].results) as StreamInfo[]

           return cachedStream
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getAllOutdatedStreamCache(): Promise<StreamCache[] | null> {
        try {
            const query = `
                SELECT
                    *
                FROM
                    stream_cache
                WHERE
                    expires_at < DATETIME('${(new Date()).toISOString()}')                   
            `
            const databasePromise: StreamCache[] = await (
                new Promise((resolve, reject) => {
                    this.database.all(query, (error: any, rows: any[]) => {
                        if(error){
                            reject(error)
                            return;
                        }
                        const parsedRows = rows.map((element: any) => {
                            return {
                                id: element.id,
                                videoId: element.video_id,
                                belchfyUrl: element.belchfy_url,
                                results: element.results,
                                expiresAt: element.expires_at
                            }
                        })
                        resolve(parsedRows)
                    })
                })
            )

            if(databasePromise.length === 0){
                return null
            }

            return databasePromise 
        } catch (error) {
            throw error
            console.log(error)
        }
    }

    async deleteCacheById(id: number): Promise<void>{
        try {
            const query = `
                DELETE FROM
                   stream_cache 
                WHERE
                    id = ${id}
            `

            await (new Promise((resolve, reject) => {
                this.database.run(query, (err: any) => {
                    if(err){
                        reject(err)
                        return
                    }

                    resolve(true)
                })
            }))

            return;
        } catch (error) {
           console.log(error)
           throw error 
        }
    }
}