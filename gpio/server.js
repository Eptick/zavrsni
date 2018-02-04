'use strict'
const express = require('express')
const path = require('path');
var bodyParser = require('body-parser')
const https = require('https')

const app = express()
var http = require('http').Server(app);

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var stupacPinMap = [14, 15, 18, 23, 24, 25,  8, 7];
var redakPinMap  = [2,   3,  4, 17, 27, 22, 10, 9];
var piStupacPins = [];
var piRedakPins = [];
function initPins() {
	for(let pin of stupacPinMap) {
		piStupacPins.push(new Gpio(pin, 'out'));
	}
	for(let pin of redakPinMap) {
		piRedakPins.push(new Gpio(pin, 'out'));
	}
}
initPins();
var frames = [];
var keys = [];
var key;
var playing = false;
function printFrame(i=0, old = 0){
	piRedakPins[old].writeSync(0);
	piRedakPins[i].writeSync(1);
	for(var j = 0; j < 8; j++) {
        // Ovdje ide 1 - state jer mora biti inverz (ground je 0 ) 1 je visoki otpor odnosno brokiran
        piStupacPins[j].writeSync(1-frames[key][i][j]);
    }
    if(playing)
	setTimeout(printFrame, 4,(i+1)%8, i);
}
function selectKey(i = 0) {
    key = keys[i];
    // setTimeout(selectKey, delay,(i+1)%(keys.length));
    if(playing)
	setTimeout(selectKey, 100000,(i+1)%(keys.length));
}

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/static', express.static(path.join(__dirname, 'static')))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.post('/', (req, res) => {
    if(req.body.action === undefined) {
        res.status(500).send({ error: 'action not sent' });
        return;
    }
    switch(req.body.action) {
        case 'display':
            keys = [];
            frames = JSON.parse( req.body.frames );
            for(let k in frames) {
                keys.push(k);
            }
            key = keys[0];
	    console.log("frames",frames);
	    console.log("keys",keys);
            if(!playing) {
		playing = true;
                setTimeout(selectKey, 1);
                setTimeout(printFrame, 2);
            } else {
		playing = false;
		setTimeout(function() {playing = true;setTimeout(selectKey, 1);setTimeout(printFrame, 2); }, 500);
	    }
        break;
    }
    res.send();
})

http.listen(8080, () => console.log('Speaker listening on port 8080!'))
