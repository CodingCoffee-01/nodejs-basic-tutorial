var http = require('http');
console.log("this server is runnning on http:localhost:4000 ");
console.log("Please input : http://localhost:4000/testing ");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  //Return the url part of the request object:
  res.write(req.url);
  res.end();
}).listen(4000);
