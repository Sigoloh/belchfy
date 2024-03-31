import axios from 'axios'
const axiosClient = axios.create({
    baseURL: 'http://localhost:4152'
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