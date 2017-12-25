
const express = require('express')
const path = require('path');
var bodyParser = require('body-parser')
var search = require('youtube-search');
var player = require('./player')

const YoutubeOpts = {
  maxResults: 10,
  key: 'AIzaSyBb4Cy7KW9wUJJ1uNOm3_di-Ufb8WMRy_4',
  type: 'video'
};

const app = express()


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
    player.play(req.body.id);
    res.send();
    console.log("ID: requested for reproduction: " + req.body.id)
})
app.listen(8080, () => console.log('app listening on port 8080!'))
