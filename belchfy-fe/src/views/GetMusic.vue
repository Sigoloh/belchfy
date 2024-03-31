<template>
    <div class="getmusic-container">
        <div class="search-container">
            <label for="playlist">Playlist url or id:</label>
            <input type="text" v-model="state.playlistToSearch">
            <button @click="searchPlaylist"><v-icon name="fa-search"/></button>
        </div>
        <div class="playlist-container" v-if="state.result">
            <div class="playlist-info">
                <div class="info-box">
                    <p class="field">
                        Name
                    </p>
                    <p class="value">
                        {{ state.result.title }}
                    </p>
                </div>
                <div class="info-box">
                    <p class="field">
                        Owner
                    </p>
                    <p class="value">
                        <a :href="state.result.owner" target="_blank">
                            {{ state.result.owner.split('/')[state.result.owner.split('/').length -1] }}
                        </a>
                    </p>
                </div>
            </div>
            <table class="video-table">
                <tr class="video-info" v-for="video in state.result.videos">
                    <td>
                        <img :src="video.thumbnail" alt="">
                    </td>
                    <td>
                        {{ video.title }} : {{ video.author }}
                    </td>
                    <td>
                        {{ parseTime(video.length) }}
                    </td>
                    <td>
                        <v-icon name="fa-play" @click="() => play(video.belchfy_url)"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
.getmusic-container{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.video-table{
    border-collapse: collapse;
    background-color: var(--clear);
    padding: 10px;
    width: 100%;
}

.video-table:nth-child(odd){
    background: var(--yellow);
}

.video-info{
    background: var(--dark-yellow);
}

.video-info img{
    width: 100px;
}

.playlist-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    widows: 100%;
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

        return {
            state,
            searchPlaylist,
            parseTime,
            play
        }
    }
}
</script>