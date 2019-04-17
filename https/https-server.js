const fs = require('fs');
const https = require('https');

const server = https.createServer({
  key: fs.readFileSync('./certificate/privatekey.pem'),
  cert: fs.readFileSync('./certificate/certificate.pem')
}, (req, res) => {
  res.writeHead(200);
  res.end('<h1>Hello World \n</h1>')
}).listen(8000);

console.log('listening on https://localhost:3000');