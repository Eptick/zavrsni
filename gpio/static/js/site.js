var socket = io();
socket.on('status update', function(msg){});
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
        message: 'Hello Vue!',
        currentIndex: 0,
        show: true,
        framesData: {}
    },
    methods: {
        getFrames: function() {
            let data = [];
            $("#board-1 .row").each(function () {
                let row = []
                $(this).children(".led").each(function () {
                    let led = $(this).children("input[type='checkbox']").first()
                    let state = (led.is(":checked")===true)?1:0;
                    row.push(state)
                })
                data.push(row)
            })
            console.log(data);
        },
        addFrame: function() {
            let row = [];
            let frame = [];
            for(let i = 0; i < this.x; i++)
                row.push(0)
            for(let i = 0; i < this.y; i++)
                frame.push(row.slice(0))
            Vue.set(this.framesData, window.countProperties(this.framesData), frame.slice(0))
        },
        getIndex: function() {
            return this.$slideshowBoards.index;
        },
        refreshSlideshow() {
            this.show = false;
            this.show = true;
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
            this.refreshSlideshow()
        },
        ledIsActive(index, rowIndex, ledIndex) {
            let state = this.framesData[parseInt(index)][rowIndex][ledIndex];
            return (state === 0)?false:true;
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
        this.refreshSlideshow()
    }
})
// // $.post( "/", { action: "status" }, function( data ) {});
// function init() {

// }
// // $("#stop").click(() => {
// //     $.post( "/", { action: "stop" }, function( data ) {
// //         console.log( data );
// //     });
// // });
})
