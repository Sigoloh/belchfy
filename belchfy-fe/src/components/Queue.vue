<template>
    <div class='queue-container'>
        <div class="queue-header">
            Queue
            <div class="queue-buttons">
                <v-icon class="icon-button" name="fa-play" fill="#000" @click="play" v-if="!state.loadingQueue"/>
                <v-icon name="ri-loader-3-line" animation="spin" v-else/>
                <v-icon class="icon-button" name="fa-random" fill="#000" @click="shuffle"/>
            </div>
        </div>
        <div class="videos-in-queue">
            <div class="video-info" v-for="video in globalState.queue.elements" :key="globalState.queue">
                 <vue-marquee-slider
                    :id="`${video.title.replace(/(\s)|(\W)/gm, '')}${video.author.replace(/(\s)|(\W)/gm, '')}`"
                    :key="`${video.title.replace(/(\s)|(\W)/gm, '')}${video.author.replace(/(\s)|(\W)/gm, '')}`"
                    :space="0"
                    :speed="10000"
                    :width="150"
                    class="scrolling-text"
                    >
                    <div class="video-name">{{ video.title }}</div>
                </vue-marquee-slider>                   
                <div class="queue-video-buttons">
                    <v-icon name="md-playlistremove" fill="#FFF" @click="() => removeVideoFromQueue(video)"/>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.queue-header{
    background-color: var(--yellow);
    color: var(--dark);
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}


.queue-buttons *{
    cursor: pointer;
}
.queue-buttons{
    display: flex;
    flex-direction: row;
    gap: 5px
}
.queue-video-buttons *{
    cursor: pointer;
}
.videos-in-queue{
    display: flex;
    flex-direction: column;
}

.video-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid white;
    padding-top: 5px;
    padding-bottom: 5px;
}

.video-name{
    max-height: 16px !important;
}

.queue-container{
    border: 1px solid white;
    font-family: "Roboto", sans-serif;
    color: white
}
</style>
<script>
import {globalState} from '../global'
import { VueMarqueeSlider } from 'vue3-marquee-slider';
import '../../node_modules/vue3-marquee-slider/dist/style.css'
import axios from 'axios'
import { reactive } from 'vue';

export default{
    components:{
        VueMarqueeSlider
    },
    setup(){
        const state = reactive({
            loadingQueue: false
        })
        function removeVideoFromQueue(video){
            console.log('Entrou aqui')
            globalState.queue.delete(video)
            console.log(globalState.queue)
        }

        function toggleLoadingQueue(){
            return state.loadingQueue = !state.loadingQueue
        }

        function shuffle(){
            globalState.queue.shuffle()
            return;
        }

        async function play(){
            toggleLoadingQueue()
            const { data } = await axios.get(globalState.queue.next().belchfy_url)
            globalState.currentPlay = data[0]
            globalState.currentPlay.autoPlay = true
            toggleLoadingQueue()
            return
        }
        return {
            globalState,
            shuffle,
            removeVideoFromQueue,
            play,
            state
        }
    } 
}
</script>