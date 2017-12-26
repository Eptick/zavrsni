const stream = require('youtube-audio-stream')

const decoder = require('lame').Decoder
const Speaker = require('speaker')
const cp = require('child_process');

var _stream = null;
exports.play = function (id) {
    this.stop();
    try {
        _stream = cp.spawn('node', [__dirname + '/play.js', id]);
        _stream.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        _stream.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        
        _stream.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    } catch(e){console.error(e)}
};
exports.stop = function() {
    try {
        if(_stream !== null)
            _stream.kill();
    } catch(e){console.log(e)};
}
