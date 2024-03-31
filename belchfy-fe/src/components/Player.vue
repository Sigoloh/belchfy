<template>
    <div class='player-container' @keydown.space="pause">
        <audio style="display: none;" controls :autoplay="props.autoPlay" ref="audio" @ended="() => {
                state.isPlaying = false;
                state.isPaused = false;
                state.isEnded = true;
                ctx.emit('ended');
            }"
            @timeupdate="() => {
                updateCurrentTime()
            }"
            @canplay="() => {
                setDuration()
            }"
            @play="() => {
                state.isPlaying = true;
                state.isPaused = false;
                state.isEnded = false;
            }"
        >
            <source :src="props.audioLink" type="audio/mp3">
        </audio>
        <div class="subtitle" v-if="props.subtitle">
            <span class="roboto-medium">{{ props.subtitle }}</span>
        </div>
        <div class="player">
            <div class="audioDetails">
                <img class="thumbnail" :src="props.thumbnailUrl" alt="">
                <div class="title">
                    <div class="title-text">
                        {{ props.title }}
                    </div>
                </div>
            </div>
            <button @click="previous"><v-icon name="md-skipprevious"></v-icon></button>
            <button @click="play" v-if="!state.isPlaying || state.isEnded"><v-icon name="fa-play"></v-icon></button>
            <button @click="pause" v-if="!state.isPaused && !state.isEnded"><v-icon name="fa-pause"></v-icon></button>
            <button @click="next"><v-icon name="md-skipnext"></v-icon></button>
            <input type="range" :min="0" step="1" :max="state.duration" v-model="state.currentTime" @change="changeCurrentTime">
            <span class="roboto-regular">{{ parseTime(state.currentTime) }}/{{ parseTime(state.duration) }}</span>
        </div>
    </div>
    </template>
<style scoped>
.thumbnail{
    width: 50px;
}
.subtitle{
    color: white;
    padding: 10px 15px 10px 15px;
}
.player-container{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 15px;
}

.player-container .player span{
    color: white;
    padding-right: 10px;
    padding-left: 10px;
}

.player-container .player buttono{
    cursor: pointer;
}
.player-container .player{
    display: flex;
    padding: 10px;
    background-color: #444444;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
}

.player-container .player input[type="range"]{
    width: 100%;
}

.player-container .player button{
    color: white;
    background-color: #444444;
    border: none;
    padding: 5px 10px 5px 10px;
}

.audioDetails{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.title{
    overflow: hidden;
    max-width: 100px;
    white-space: nowrap;
    padding: 5px;
}

.title-text{
    text-align: left;
    font-family: "Roboto", sans-serif;
    color: var(--clear);
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -moz-animation: my-animation 15s linear infinite;
    -webkit-animation: my-animation 15s linear infinite;
    animation: my-animation 15s linear infinite
}

@-moz-keyframes my-animation {
  from { -moz-transform: translateX(100%); }
  to { -moz-transform: translateX(-100%); }
}

@-webkit-keyframes my-animation {
  from { -webkit-transform: translateX(100%); }
  to { -webkit-transform: translateX(-100%); }
}

@keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  to {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
</style>
<script lang='ts'>
import { onBeforeUpdate, reactive, ref } from 'vue';
export default{
    props: {
        audioLink: {
            type: String,
            required: true,
        },
        autoPlay: {
            type: Boolean,
            default: false,
        },
        subtitle: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true
        }
    },
    emits: ['ended', 'next', 'previous'],
    setup(props, ctx){
        const audio = ref<HTMLAudioElement | null>(null)
        const state = reactive({
            isPlaying: false,
            isPaused: true,
            isEnded: false,
            currentTime: 0,
            duration: 0,
        })

        function setDuration(){
            if(audio.value){
                state.duration = audio.value.duration;
            }
        }

        function updateCurrentTime(){
            if(audio.value){
                state.currentTime = audio.value.currentTime;
            }
        }

        function changeCurrentTime(){
            if(audio.value){
                audio.value.currentTime = state.currentTime;
            }
        }

        function play(){
            if(audio.value){
                if(state.isEnded){
                    audio.value.currentTime = 0;
                    state.currentTime = 0;
                    state.isEnded = false;
                }
                audio.value.play();
                state.isPlaying = true;
                state.isPaused = false;
            }
        }

        function next(){
            ctx.emit('next')
            return;
        }

        function previous(){
            if(state.currentTime > 20){
                state.currentTime = 0;
                audio.value.currentTime = 0;
                return;
            }

            ctx.emit('previous')
        }

        function pause(){
            if(audio.value){
                audio.value.pause();
                state.isPaused = true;
                state.isPlaying = false;
            }
        }

        function parseTime(time: number){
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }

        return {
            props,
            ctx,
            audio,
            play,
            previous,
            next,
            pause,
            state,
            updateCurrentTime,
            setDuration,
            changeCurrentTime,
            parseTime,
        };
    }
}
</script>