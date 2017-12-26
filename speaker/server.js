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
const io = require('socket.io')(http);

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
app.post('/search', (req, res) => {
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

app.post('/play', (req, res) => {
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
