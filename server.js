const http = require('http');
const os = require('os');

console.log('App is starting...');

const handleRequest = (req, res) => {
  console.log('Received request from ' + req.connection.remoteAddress);
  res.writeHead(200);
  
  // Simulate CPU load
  for (let i = 0; i < 1e7; i++) {}
  
  res.end('Hello World! From ' + os.hostname() + '\n');
};

const server = http.createServer(handleRequest);
server.listen(8080);
console.log('Server listening on port 8080');

