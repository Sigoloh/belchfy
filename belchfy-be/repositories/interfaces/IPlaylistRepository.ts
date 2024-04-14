import { Playlist } from "../types/Playlist.types";

export interface IPlaylistRepository{
    createPlaylist(playlist: Playlist): Promise<boolean>
    getPlaylistByPlaylistId(playlistId: string): Promise<Playlist | null>
    updatePlaylistByPlaylistId(playlistId: string, playlist: Playlist): Promise<boolean>
    getAllPlaylists(): Promise<Playlist[] | null>
}