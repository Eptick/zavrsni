var socket = io();
socket.on('status update', function(msg){
    
});
Vue.config.devtools = true
window.framesData = [
    [[0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]],
];
$(document).ready(() => {
Vue.component('board', {
    props: {
        frame: {
            default: 1
        }
    },
    template:
    `
    <div class="board" :id="getBoardId()">
        <div class="row" v-for="(row, rowIndex) in getFrame()">
            <div class="led" v-for="(led, ledIndex) in row">
            <input type="checkbox" v-model="getFrame()[rowIndex][ledIndex]" :true-value="1" :false-value="0" v-bind:name="getLedId(rowIndex,ledIndex)" v-bind:id="getLedId(rowIndex,ledIndex)"><label v-bind:for="getLedId(rowIndex,ledIndex)"></label>
            </div>
        </div>
    </div>
    `,
    methods: {
        getFrame: function() {
            if(window.framesData !== undefined)
                return window.framesData[this.frame-1]
            return []
        },
        getLedId: function(row, led) {
            return this.frame +'-'+row+led; 
        },
        getBoardId: function() {
            return 'board-'+this.frame; 
        }
    },
    data: () => {
    return {
        leds : [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]]
        }
    }
})
window.gpio = new Vue({
    el: '#app',
    data: {
        frames: 1,
        message: 'Hello Vue!'
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
        }
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
