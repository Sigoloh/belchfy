import {reactive} from 'vue'
import { Queue } from './utils/Queue'
export const globalState = reactive({
    currentPlay: {},
    queue: new Queue()
})