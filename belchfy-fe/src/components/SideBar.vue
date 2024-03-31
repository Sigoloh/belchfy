<template>
    <div class="sidebar-container">
        <header>
            <h1>Belchfy</h1>
        </header>
        <main>
        </main>
        <footer>
            <Queue/>            
        </footer>
    </div>
</template>

<style scoped>
.sidebar-container{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar-container header{
}

.sidebar-container header h1{
    font-family: "Montserrat", sans-serif;
    flex-grow: 1;
    color: var(--clear);
    margin: 0
}

.sidebar-container main{
    flex-grow: 8;
}

.sidebar-container footer{
    flex-grow: 1;
    height: 300px;
    max-height: 300px;
    overflow-y: scroll;
}
</style>

<script>
import Queue from './Queue.vue'
export default{
    components:{
        Queue,
    },
    setup(){
        return;
    }
}
</script>