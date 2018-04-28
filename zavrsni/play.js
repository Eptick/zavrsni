const stream = require('youtube-audio-stream')

const decoder = require('lame').Decoder
const Speaker = require('speaker')
var id = process.argv[2]
if(id !== undefined)
    stream('http://youtube.com/watch?v='+id).pipe(decoder()).pipe(new Speaker())
