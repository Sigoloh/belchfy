<template>
    <div class="getmusic-container">
        <div class="search-container">
            <input type="text" v-model="state.playlistToSearch" placeholder="Playlist url or id">
            <button @click="searchPlaylist"><v-icon name="fa-search"/></button>
        </div>
        <div class="playlist-container" v-if="state.result">
            <table class="video-table">
                <tr class="table-header">
                    <td class="playlist-cell">
                        Playlist
                    </td>
                    <td style="padding-left: 10px; background-color: var(--yellow);">
                        {{ state.result.title }}
                    </td>
                    <td class="playlist-actions" style="background-color: var(--yellow);">
                        <div class="action-buttons">
                            <button @click="addPlaylistToQueueShuffleAndPlayFirst">
                                <v-icon name="fa-random"/>
                            </button>
                        </div>
                    </td>
                    <td class="playlist-actions" style="background-color: var(--yellow);">
                        <div class="action-buttons">
                            <button @click="addPlaylistToQueueAndPlayFirst">
                                <v-icon name="fa-play"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr class="video-info" v-for="video in state.result.videos">
                    <td class="video-thumbnail-container">
                        <div :style="`background: url(${video.thumbnail})`">
                            <div class="thumbnail-buttons">
                                <v-icon class="icon-button" name="fa-play" fill="#FFF" @click="() => play(video.belchfy_url)"/>
                                <v-icon class="icon-button" name="md-queue-outlined" fill="#FFF" @click="() => addVideoToQueue(video)"/>
                            </div>
                        </div>
                    </td>
                    <td style="padding-left: 10px;">
                        {{ video.title }} : {{ video.author }}
                    </td>
                    <td>
                       
                    </td>
                    <td>
                        {{ parseTime(video.length) }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>

.search-container input:focus{
    outline: none;
}
.search-container input{
    border: 1px solid var(--yellow);
    font-size: 20px;
    height: 100px;
    width: 100%;
}
.search-container button{
    background-color: var(--yellow);
    border: none;
    height: 104px;
    width: 125px;
    cursor: pointer;
}

.search-container{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: flex-start;
}
.table-header{
    border: 1px solid black;
    border-left: 1px solid white
}
.table-header .playlist-cell{
    background-color: black;
    color: var(--yellow);
    font-weight: bold;
    max-width: 100px;
    width: 100px;
    text-align:center;
}

.video-table .playlist-actions{
    height: 50px;
}


.video-table .playlist-actions .action-buttons button{
    background-color: var(--yellow);
    border: none;
    cursor: pointer;
}

.video-table .playlist-actions .action-buttons{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.getmusic-container{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-family: "Roboto", sans-serif;
}

.video-table{
    border-collapse: collapse;
    background-color: var(--clear);
    padding: 10px;
    width: 100%;
}

.video-info:nth-child(odd){
    background-color: var(--yellow);
}

.video-info{
    border-top: 1px solid black ;
}

.video-thumbnail-container{
    display: flex;
    max-width: 100px;
    widows: 100px;
    height: 100px;
    max-height: 100px;
}

.video-thumbnail-container div{
    height: 100px;
    width: 100px;
    background-size: contain !important;
}


.video-thumbnail-container .thumbnail-buttons:hover{
    opacity: 1;
    background-color: rgba(0,0,0,0.5);
}

.video-thumbnail-container .thumbnail-buttons{
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    justify-content: center;
    opacity: 0;
}

.video-thumbnail-container .thumbnail-buttons .icon-button{
    cursor: pointer;
}


.video-info img{
    width: 100px;
    margin: 0;
    padding: 0;
}

.playlist-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow-y: scroll;
}

.playlist-container .playlist-info{
    display: flex;
    flex-direction: row;
    gap: 10px
}

.playlist-container .playlist-info .info-box{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}


.playlist-container .playlist-info .info-box .field{
    background-color: var(--dark);
    padding: 5px 5px 5px 10px;
    color: var(--clear);
    font-weight: 500;
    font-family: "Roboto", sans-serif
}


.playlist-container .playlist-info .info-box .value{
    background-color: var(--clear);
    padding: 4px;
    border: 1px solid var(--dark);
    font-family: "Roboto", sans-serif
}
</style>

<script>
import Player from '../components/Player.vue'
import {reactive} from 'vue'
import {getPlaylist} from '../api/belchfyClient'
import axios from 'axios'
import {globalState} from '../global'
export default{
    components: {
        Player,
    },
    setup(){
        const state = reactive({
            playlistToSearch: '',
            result: undefined
        })
        function parseTime(timeInSeconds){
            const minutes = String(Math.floor(timeInSeconds / 60))

            const seconds = String(timeInSeconds % 60).padStart(2,'0')

            const hours = String(Math.floor(minutes / 60).toFixed(1))
            console.log(minutes)
            if(hours > 0){
                return `${hours}:${minutes.padStart(2, '0')}:${seconds}`
            }

            return `${minutes}:${seconds}`
        }

        async function play(url){
            const response = await axios.get(url)
            globalState.currentPlay = response.data[0]
            globalState.currentPlay.autoPlay = true
        }

        async function addVideoToQueue(video){
            console.log('Bateu aqui')
            globalState.queue.add(video)
            console.log(globalState.queue)
        }

        async function searchPlaylist(){
            let playlistId = ''
            if(
                state.playlistToSearch.match(
                    /(https:\/\/)?(www\.)?youtube.com\/playlist\?list=[A-Za-z_\-0-9]{34,40}/gm
                )
            ){
                const splitLink = state.playlistToSearch.split(`/`)
                playlistId = splitLink[splitLink.length - 1].replace('playlist?list=', '')
            }else{
                playlistId = state.playlistToSearch
            }

            state.result = await getPlaylist(playlistId)
        }

        async function addPlaylistToQueueAndPlayFirst(){
            for(const video of state.result.videos){
                globalState.queue.add(video)
            }

            const { data } = await axios.get(globalState.queue.next().belchfy_url)
            globalState.currentPlay = data[0]
            globalState.currentPlay.autoPlay = true
        }

        async function addPlaylistToQueueShuffleAndPlayFirst(){
            for(const video of state.result.videos){
                globalState.queue.add(video)
            }
            globalState.queue.shuffle()

            const { data } = await axios.get(globalState.queue.next().belchfy_url)

            globalState.currentPlay = data[0]

            globalState.currentPlay.autoPlay = true
        }

        return {
            state,
            searchPlaylist,
            parseTime,
            play,
            addVideoToQueue,
            addPlaylistToQueueAndPlayFirst,
            addPlaylistToQueueShuffleAndPlayFirst
        }
    }
}
</script>