'use strict'
const express = require('express')
const path = require('path');
var bodyParser = require('body-parser')
var search = require('youtube-search')
var player = require('./player')
const https = require('https')

const YoutubeOpts = {
    maxResults: 10,
    key: 'AIzaSyBb4Cy7KW9wUJJ1uNOm3_di-Ufb8WMRy_4',
    type: 'video'
};

const app = express()
var http = require('http').Server(app);
const io = require('socket.io')(http, {path : '/ajax/socket'});

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
var delay = 250;
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
    console.log("Key change: ", key, "Delay", delay);
    if(playing)
        setTimeout(selectKey, delay,(i+1)%(keys.length));
}


app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/gpio', (req, res) => {
    if(req.body.action === undefined) {
        res.status(500).send({ error: 'action not sent' });
        return;
    }
    switch(req.body.action) {
        case 'display':
            keys = [];
            delay = parseInt( req.body.delay );
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



app.post('/speaker/', (req, res) => {
    if(req.body.action === undefined) {
        res.status(500).send({ error: 'action not sent' });
        return;
    }
    switch(req.body.action) {
        case 'stop':
            player.stop();
            sendResponseToClient("", STATUS.STOPED);
        break;
        case 'turnup':

        break;
        case 'turndown':

        break;
        case 'mute':

        break;
        case 'status':
            let id = player.playing;
            if(id !== null)
                getSongTitle(id);
            else
                sendResponseToClient("", STATUS.STOPED);
        break;
    }
    res.send();
})
app.post('/speaker/search', (req, res) => {
    if(req.body.term === undefined) {
        res.status(500).send({ error: 'term not sent' });
        return;
    }
    search(req.body.term, YoutubeOpts, function(err, results) {
        if(err) return console.log(err);
        let response = [];
        results.forEach(elem => {
            response.push({
                id : elem.id,
                title: elem.title,
                thumb: elem.thumbnails.default.url
            })
        });
        res.send(response);
    });
})

app.post('/speaker/play', (req, res) => {
    if(req.body.id === undefined) {
        res.status(500).send({ error: 'id not sent' });
        return;
    }
    try {
        player.play(req.body.id);
        getSongTitle(req.body.id);
        res.send();
    }catch(e){console.error(e)};
    console.log("ID: requested for reproduction: " + req.body.id)
})
app.post('/', (req, res) => {
    console.log('request');
    res.send();
})

/**
 * Status code
 */
const STATUS = {
    PLAYING : 1,
    STOPED : 2,
    WAITING : 3
}
function sendResponseToClient(title, status) {
    io.emit('status update', {title: title, status: status});
}
player.closeEmitter.on('close', () => {
    sendResponseToClient("", STATUS.STOPED);
})
function getSongTitle(id) {
    if(id === null)
        return;

    https.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBb4Cy7KW9wUJJ1uNOm3_di-Ufb8WMRy_4&id=${id}&part=snippet`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        data = JSON.parse(data);
        sendResponseToClient(data.items[0].snippet.title, STATUS.PLAYING);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(8080, () => console.log('Speaker listening on port 8080!'))
