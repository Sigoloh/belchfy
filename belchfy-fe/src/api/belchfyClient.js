import axios from 'axios'


const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4152'
})

export async function getPlaylist(playlistId){
    try {
       const response = await axiosClient.get(`/playlists/get/${playlistId}`)
       return response.data
    } catch (error) {
        console.log(error)
        throw error 
    }
}

export async function getAllPlaylists(){
    try {
        const response = await axiosClient.get('/playlists/get') 
        return response.data 
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updatePlaylistById(playlistId){
    try {
        const response = await axiosClient.patch(`/playlists/update/${playlistId}`)
        return response.status
    } catch (error) {
        console.log(error)
        throw error    
    }
}