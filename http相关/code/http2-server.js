const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('./certificate/privatekey.pem'),
  cert: fs.readFileSync('./certificate/certificate.pem')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream 是一个双工流
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(3000);
console.log('listening on https://localhost:3000');