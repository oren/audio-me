var http = require('http');
var fs = require('fs');
var st = require('st');
var indexHtml = fs.readFileSync(__dirname + '/index.html');

var mount = st({ path: __dirname + '/static', url: '/static' });
http.createServer(function (req, res) {
    // serve the static assets from public
    var staticFile = mount(req, res);
    if (staticFile) { return; }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexHtml);
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
