const http2 = require('http2')
const fs = require('fs')

const urls = [
  'https://localhost:8443',
  'https://jsonplaceholder.typicode.com']

const options = {
  ca: fs.readFileSync('localhost-cert.pem')
  // ca: fs.readFileSync('sni233425cloudflaresslcom.crt')
}

const client = http2.connect(urls[0], options)

client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/' });

req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  } 
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => { data += chunk; });
req.on('end', () => {
  console.log(`\n${data}`);
  client.close();
});
req.end();