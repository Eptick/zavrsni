'use strict'
const express = require('express')
const path = require('path');
var bodyParser = require('body-parser')

const https = require('https')

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
        case 'akcija':
            
        break;
    }
    res.send();
})
app.post('/search', (req, res) => {
    if(req.body.term === undefined) {
        res.status(500).send({ error: 'term not sent' });
        return;
    }
})

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(8080, () => console.log('Speaker listening on port 8080!'))
