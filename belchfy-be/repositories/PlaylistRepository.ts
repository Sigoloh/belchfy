import { Database } from "sqlite3";
import { Playlist } from "./types/Playlist.types";
import { IPlaylistRepository } from "./interfaces/IPlaylistRepository";

export class PlaylistRepository implements IPlaylistRepository{
    constructor(
        private database: Database
    ){}

    async createPlaylist(playlist: Playlist): Promise<boolean>{
        try {
            
            const query = `
                INSERT INTO playlists
                    (
                        belchfy_url,
                        owner,
                        playlist_id,
                        title, 
                        videos, 
                        created_at, 
                        last_updated
                    )
                VALUES (
                    '${playlist.belchfyUrl}',
                    '${playlist.owner}',
                    '${playlist.playlistId}', 
                    '${playlist.title}', 
                    '${JSON.stringify(playlist.videos)}',
                    DATETIME('now'),
                    DATETIME('now')
                );
            `

            const sqlPromise: boolean = await (
                new Promise((resolve, reject) => {
                    this.database.run(query, (err: any) => {
                        if(err){
                            reject(err)
                            return;
                        }

                        resolve(true)
                    })
                })
            )

            return sqlPromise
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getPlaylistByPlaylistId(playlistId: string): Promise<Playlist | null>{
        try {
            const query = `
                SELECT
                    *
                FROM
                    playlists p
                WHERE
                    p.playlist_id = '${playlistId}'
            `

            const sqlPromise: any[] = await (
                new Promise((resolve, reject) => {
                    this.database.all(query, (err: any, rows: any[]) => {
                        if(err){
                            reject(err)
                            return
                        }

                        resolve(rows)
                    })
                })
            )

            if(!sqlPromise.length){
                return null
            }

            const parsedResults = sqlPromise.map((element: any) => {
                return {
                    id: element.id,
                    belchfyUrl: element.belchfy_url,
                    owner: element.owner,
                    playlistId: element.playlist_id,
                    title: element.title,
                    videos: JSON.parse(element.videos),
                    createdAt: new Date(element.created_at),
                    lastUpdated: new Date(element.last_updated)
                } as Playlist
            })

            return parsedResults[0]
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updatePlaylistByPlaylistId(playlistId: string, playlist: Playlist): Promise<boolean>{
        try {
           const query = `
            UPDATE playlists
            SET
                videos = '${JSON.stringify(playlist.videos)}',
                last_updated = DATETIME('now')
            WHERE playlist_id = '${playlistId}';
           ` 

            const sqlPromise: boolean = await (
                new Promise((resolve, reject) => [
                    this.database.run(query, (err: any) => {
                        if(err){
                            reject(err)
                            return
                        }

                        resolve(true)
                    })
                ])
            )

            return sqlPromise
        } catch (error) {
           console.log(error) 
           throw error
        }
    }
}