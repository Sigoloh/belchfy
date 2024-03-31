<template>
  <div class="container">
    <div class="sidebar">
      <SideBar></SideBar>
    </div>
    <div class="content">
      <div class="player-container">
        <Player 
          :key="globalState.currentPlay.url"
          :audio-link="globalState.currentPlay.url"
          :thumbnail-url="globalState.currentPlay.thumbnail"
          :title="globalState.currentPlay.title"
          :auto-play="globalState.currentPlay.autoPlay"
        />
      </div>

      <RouterView />
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
export default{
  components: {
    SideBar,
    Player,
    RouterLink,
    RouterView
  },
  setup(){
    return{
      globalState
    }
  }
}
</script>