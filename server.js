var http = require('http');
var fs = require('fs');
var indexHtml = fs.readFileSync(__dirname + '/index.html');

http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(indexHtml);
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
