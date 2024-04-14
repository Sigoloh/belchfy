<template>
  <div class="container">
    <div class="sidebar">
      <SideBar></SideBar>
    </div>
    <div class="content">
      <div class="player-container">
        <Player 
          :key="globalState.currentPlay.url"
          @ended="playNext"
          @next="playNext"
          @previous="playPrevious"
          :audio-link="globalState.currentPlay.url"
          :thumbnail-url="globalState.currentPlay.thumbnail"
          :title="globalState.currentPlay.title"
          :auto-play="globalState.currentPlay.autoPlay"
          v-if="globalState.currentPlay.url"
        />
      </div>

      <RouterView :key="state.currentRoute"/>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  height: 100vh;
  max-height: 100vh;
  flex-direction: row;
}

.container .sidebar{
  padding: 10px 15px;
  background-color: var(--dark);
  flex-grow: 1;
  width: 20% !important;
  max-width: 20% !important;
}

.content{
  flex-grow: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
</style>

<script>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import Player from './components/Player.vue'
import {globalState} from './global'
import axios from 'axios'
import { reactive } from 'vue'
import router from './router'
export default{
  components: {
    SideBar,
    Player,
    RouterLink,
    RouterView
  },

  setup(){
    const state = reactive({
      currentRoute: router.currentRoute
    })
    async function playNext(){
      const next = globalState.queue.next()
      const { data } = await axios.get(next.belchfy_url)
      globalState.currentPlay = data[0]
      globalState.currentPlay.autoPlay = true
      return;
    }

    async function playPrevious(){
      const previous = globalState.queue.previous()
      const { data } = await axios.get(previous.belchfy_url)
      globalState.currentPlay = data[0]
      globalState.currentPlay.autoPlay = true
      return;
    }
    return{
      playPrevious,
      globalState,
      playNext,
      state
    }
  }
}
</script>