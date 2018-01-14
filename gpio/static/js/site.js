Vue.config.devtools = true;
function countProperties(obj) {
    var count = 0;
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }
    return count;
}
$(document).ready(function () {
window.gpio = new Vue({
    el: '#app',
    data: {
        x: 8,
        y: 8,
        frame: [],
        frames: 2,
        currentIndex: 0,
        show: true,
        framesData: {},
        slideshow: undefined,
        delay: 100
    },
    methods: {
        getFrames: function() {
            return JSON.stringify(this.framesData)
        },
        addFrame: function() {
            let row = [];
            let frame = [];
            for(let i = 0; i < this.x; i++)
                row.push(0)
            for(let i = 0; i < this.y; i++)
                frame.push(row.slice(0))
            let newFrameIndex =  window.countProperties(this.framesData);
            Vue.set(this.framesData,newFrameIndex, frame.slice(0))
            this.refreshSlideshow();
            this.goTo(newFrameIndex);
        },
        goTo(index = 0) {
            let self = this;
            setTimeout(() => {self.slideshow.show(index)}, 50);
        },
        refreshSlideshow(reRender = true) {
            this.show = false;
            this.show = true;
            if(reRender) {
                this.slideshow = UIkit.slideshow($("#slideshowBoards").get(0), {})
            }
        },
        getLedId: function(index, row, led) {
            return index +'-'+row+led; 
        },
        setLedState(index, row, led) {
            let state = this.framesData[parseInt(index)][row][led];
            if(state === 0)
                this.framesData[parseInt(index)][row][led] = 1;
            else
                this.framesData[parseInt(index)][row][led] = 0;
            this.refreshSlideshow(false);
        },
        ledIsActive(index, rowIndex, ledIndex) {
            let state = this.framesData[parseInt(index)][rowIndex][ledIndex];
            return (state === 0)?false:true;
        },
        removeFrame() {
            let count = window.countProperties(this.framesData);
            if(count === 1)
                return;
            let indexToRemove = this.slideshow.getIndex();
            console.log(indexToRemove);
            for(let i = indexToRemove+1; i < count; i++)
                this.framesData[i-1] = this.framesData[i];
            delete this.framesData[count-1];
            this.refreshSlideshow();
        },
        sendData() {
            let data = {}
            data.action = "display"
            data.frames = this.getFrames();
            data.delay = this.delay;
            $.ajax({
                type: "POST",
                url: "http://192.168.1.69:8080/",
                data: data,
                success: (data) => {console.log(data)},
                dataType: 'json'
              });
        }
    },
    created: function () {
        this.framesData = {}
        for(let j = 0; j < this.frames; j++) {
            let row = [];
            let frame = [];
            for(let i = 0; i < this.x; i++) {
                row.push(0)
            }
            for(let i = 0; i < this.y; i++) {
                frame.push(row.slice(0))
            }
            this.framesData[j] = frame;
        }
    },
    mounted: function() {
        this.refreshSlideshow();
    }
})
})
