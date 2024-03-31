export class Queue{
    elements = []
    current = -1
    size = 0

    add(video){
        this.elements.push(video)
        this.size++
    }

    previous(){
        if(this.current - 1 < 0){
            this.current = this.size - 1
            return this.elements[this.current]
        }

        this.current--;
        return this.elements[this.current]
    }

    next(){
        if(this.size <= this.current + 1){
            this.current = 0;
            return this.elements[this.current]
        }

        this.current++;

        return this.elements[this.current]
    }

    delete(video){
        this.elements = this.elements.filter(element => element.video_id !== video.video_id)
        this.size--
    }

}