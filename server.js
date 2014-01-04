var http = require('http');
var fs = require('fs');
var st = require('st');
var indexHtml = fs.readFileSync(__dirname + '/index.html');
var shoe = require('shoe');
var through = require('through');

var mount = st({ path: __dirname + '/static', url: '/static', cache: false });
var server = http.createServer(function (req, res) {
    // serve the static assets from public
    var staticFile = mount(req, res);
    if (staticFile) { return; }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexHtml);
}).listen(3000, '127.0.0.1');

var fstream = fs.createWriteStream('/Users/akim/Downloads/server-foo.wav');
var tr = through(base64Decoder);

var sock = shoe(function (stream) {
    stream.pipe(tr).pipe(fstream, { end : false });
});

function base64Decoder(buf) {
    var binary = new Buffer(buf, 'base64');
    this.queue(binary);
}

sock.install(server, '/record');
console.log('Server running at http://127.0.0.1:3000/');
