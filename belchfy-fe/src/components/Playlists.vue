<template>
    <div class='playlists-container'>
        <div class="playlists-header">
            <h2>
                Playlists
            </h2>
        </div>
        <div class="playlists-list">
            <div class="playlist-item" v-for="playlist in globalState.playlists" :key="playlist.playlistId">
                <v-icon name="fa-angle-right"></v-icon>
                <RouterLink class="playlist-item" :to="`/playlist/${playlist.playlistId}`">
                    {{ playlist.title }}
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.playlist-item{
    color: var(--yellow);
    font-weight: bold;
    text-decoration: none;
}

.playlists-list{
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content:center;
    align-items: flex-start;
}

.playlists-container{
    color: var(--clear);
    font-family: 'Roboto', sans-serif;
}


.playlists-header h2{
    margin: 0
}

.playlists-header{
    font-family: 'Montserrat', sans-serif;
    color: var(--clear);
    border-bottom: 1px solid var(--clear);
    margin-bottom: 10px;
    margin-top: 10px;
}
</style>
<script>
import { getAllPlaylists } from '@/api/belchfyClient';
import {globalState} from '../global'
import { onBeforeMount, reactive } from 'vue';

export default{
    setup(){
        onBeforeMount(async () => {
            globalState.playlists = await getAllPlaylists()
        })

        return{
            globalState,
            onBeforeMount
        }
    }
}
</script>