不管是 `http/2` 还是 `https` 都需要 密钥 和证书，所以，需要先生成这两个文件，步骤如下：

> 注意：windows 系统需要安装 `gitbash`, 然后使用 `OpenSSL` 生成 我们需要的文件.

#### 生成私钥 key 文件：

```
openssl genrsa -out privatekey.pem 1024
```
成功执行后，当前目录就会多了一个 `privatekey.pem` 文件了。

#### 通过私钥生成 CSR 证书签名
```
openssl req -new -key privatekey.pem -out certrequest.csr
```
生成证书的过程，会出现比较多的提问，全部按 enter 跳过就行了。成功执行后，目录会多出一个 `certificate.csr` 文件。

#### 通过私钥和证书签名生成证书文件
```
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out
```
执行后，会多出一个 `certificate.pem`　文件。

我们在创建 http2 服务 或 https 服务时，都需要用到 `privatekey.pem` 和 `certificate.pem`，具体用法，请参考 例子代码。关于创建密钥和证书的就写到这里。