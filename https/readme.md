不管是 `http2` 还是 `https` 都需要 密钥 和证书，所以，需要先生成这两个文件，步骤如下：

> 注意：windows 系统需要安装 `gitbash`, 然后使用 `OpenSSL` 生成 我们需要的文件.

#### 生成私钥 key 文件：

```shell
openssl genrsa -out privatekey.pem 1024
```
成功执行后，当前目录就会多了一个 `privatekey.pem` 文件了。

#### 通过私钥生成 CSR 证书签名
```shell
openssl req -new -key privatekey.pem -out certrequest.csr
```
这过程会出现比较多的提问，全部按 enter 跳过就行了。成功执行后，会多出一个 `certificate.csr` 文件。

#### 通过证书签名生成证书文件
```shell
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out
```
执行后，会多出一个 `certificate.pem`　文件。

我们在创建 http2 服务 或 https 服务时，都需要用到 `privatekey.pem` 和 `certificate.pem`，具体用法，具体 demo 如下：

目前，高版本的 node 都内置了 http2 和 https 模块，所以不需要安装第三方依赖，直接引入使用即可。

### 创建 https 服务

```javascript
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
```

### 创建 http2 服务
```javascript
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
```

### 注意：
1. 因为我们的证书是没有权威机构认证过的，所以第一次打开，浏览器可以会有安全提醒，直接选择高级，仍要访问就行了。
