const cp = require('child_process');
const EventEmitter = require('events');

class CloseEmitter extends EventEmitter {}

var closeEmitter = new CloseEmitter();
exports.closeEmitter = closeEmitter;

var _stream = null;
exports.playing = null;
exports.play = function (id) {
    this.stop();
    let self = this;
    try {
        _stream = cp.spawn('node', [__dirname + '/play.js', id]);
        this.playing = id;
        _stream.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        _stream.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        
        _stream.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        _stream.on("close", (code, signal) => {
            self.playing = null;
            closeEmitter.emit('close');
        });
    } catch(e){console.error(e)}
};
exports.stop = function() {
    try {
        if(_stream !== null)
            _stream.kill();
    } catch(e){console.log(e)};
}
