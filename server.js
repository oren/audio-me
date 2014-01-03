var http = require('http');
var fs = require('fs');
var st = require('st');
var indexHtml = fs.readFileSync(__dirname + '/index.html');
var shoe = require('shoe');

var mount = st({ path: __dirname + '/static', url: '/static', cache: false });
var server = http.createServer(function (req, res) {
    // serve the static assets from public
    var staticFile = mount(req, res);
    if (staticFile) { return; }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexHtml);
}).listen(3000, '127.0.0.1');

var fstream = fs.createWriteStream('tmp/foo.wav');
var sock = shoe(function (stream) {
    stream.pipe(fstream, { end : false });
});

sock.install(server, '/record');
console.log('Server running at http://127.0.0.1:3000/');
