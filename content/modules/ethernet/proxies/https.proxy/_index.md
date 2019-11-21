---
title: "https.proxy"
date: 2019-02-25T13:22:47+01:00
draft: false
weight: 5
---

A full featured HTTPS transparent proxy that can be scripted using javascript modules. If used together with a [spoofer](/modules/ethernet/spoofers/), all HTTPS traffic will be redirected to it and it will automatically handle port redirections as needed.

{{% notice info %}}
When a new TLS connection is being proxied, bettercap will fetch the original certificate from the target host and resign on the fly the full chain using its own CA.
{{% /notice %}}

### Commands

#### `https.proxy on`

Start the HTTPS proxy.
#### `https.proxy off`

Stop the HTTPS proxy.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `https.port` | `443` | HTTPS port to redirect when the proxy is activated. |
| `https.proxy.address` | `<interface address>` | Address to bind the HTTPS proxy to. |
| `https.proxy.port` | `8083` | Port to bind the HTTPS proxy to. |
| `https.proxy.certificate` | `~/.bettercap-ca.cert.pem` | HTTPS proxy certification authority TLS certificate file. |
| `https.proxy.key` | `~/.bettercap-ca.key.pem` | HTTPS proxy certification authority TLS key file. |
| `https.proxy.certificate.bits` | `4096` | Number of bits of the RSA private key of the generated HTTPS certificate authority. |
| `https.proxy.certificate.commonname` | `Go Daddy Secure Certificate Authority - G2` | Common Name field of the generated HTTPS certificate authority. |
| `https.proxy.certificate.country` | `US` | Country field of the generated HTTPS certificate authority. |
| `https.proxy.certificate.locality` | `Scottsdale` | Locality field of the generated HTTPS certificate authority. |
| `https.proxy.certificate.organization` | `GoDaddy.com, Inc.` | Organization field of the generated HTTPS certificate authority. |
| `https.proxy.certificate.organizationalunit` | `https://certs.godaddy.com/repository/` | Organizational Unit field of the generated HTTPS certificate authority. |
| `https.proxy.sslstrip` | `false` | Enable or disable SSL stripping. |
| `https.proxy.script` | | Path of a proxy module script. |
| `https.proxy.injectjs` | | URL, path or javascript code to inject into every HTML page. |
| `https.proxy.blacklist` | | Comma separated list of hostnames to skip while proxying (wildcard expressions can be used). |
| `https.proxy.whitelist` | | Comma separated list of hostnames to proxy if the blacklist is used (wildcard expressions can be used). |

### Modules

The `http.proxy` and `https.proxy` modules can be scripted using javascript files that must declare at least one of the following functions:

```js
// called when the script is loaded
function onLoad() {

}

// called when the request is received by the proxy
// and before it is sent to the real server.
function onRequest(req, res) {

}

// called when the request is sent to the real server
// and a response is received
function onResponse(req, res) {

}

// called every time an unknown session command is typed,
// proxy modules can optionally handle custom commands this way:
function onCommand(cmd) {
    if( cmd == "test" ) {
        /*
         * Custom session command logic here.
         */

        // tell the session we handled this command
        return true
    }
}
```

Modules can change the `req` request and `res` response objects, for instance the [web-override.cap caplet](https://github.com/bettercap/caplets/blob/master/web-override/web-override.cap) is using the `onRequest` function in order to override every request before it is executed with a fake response:

```js
function onRequest(req, res) {
    res.Status      = 200;
    res.ContentType = "text/html";
    res.Body        = readFile("caplets/www/index.html");
    headers         = res.Headers.split("\r\n")
    for (var i = 0; i < headers.length; i++) {
        header_name = headers[i].replace(/:.*/, "")
        res.RemoveHeader(header_name);
    }
    res.SetHeader("Connection", "close");
}
```

The [login-man-abuse.cap caplet](https://github.com/bettercap/caplets/blob/master/login-manager-abuse/login-man-abuse.cap) instead will use the `onResponse` handler to inject its malicious javascript file in every html response:

```js
function onResponse(req, res) {
    if( res.ContentType.indexOf('text/html') == 0 ){
        var body = res.ReadBody();
        if( body.indexOf('</head>') != -1 ) {
            res.Body = body.replace( 
                '</head>', 
                '<script type="text/javascript">' + "\n" +
                    AbuserJavascript +
                '</script>' +
                '</head>'
            ); 
        }
    }
}
```

#### Builtin Functions

Modules can use the following builtin functions.

| function | description |
|----------|-------------|
| `readDir("/path/")` | Return the contents of a directory as a string array. |
| `readFile("/path/to/file")` | Return the contents of a file as a string. |
| `writeFile("/path/to/file", "hello world")` | Write the string `hello world` to a file, returns `null` or an error message. |
| `log_debug("message")` | Log a message in the interactive session (its level will be `DEBUG`). |
| `log_info("message")` | Log a message in the interactive session (its level will be `INFO`). |
| `log_warn("message")` | Log a message in the interactive session (its level will be `WARNING`). |
| `log_error("message")` | Log a message in the interactive session (its level will be `ERROR`). |
| `log_fatal("message")` | Log a message in the interactive session (its level will be `FATAL`). |
| `log("message")` | Shortcut for `log_info("message")`. |
| `btoa("message")` | Encode a message to base64. |
| `atob("bWVzc2FnZQ==")` | Decode a message from base64. |
| `gzipCompress("plaintext data")` | Compress a string using gzip encoding. |
| `gzipDecompress(")9�\+�I��+I�(QHI,I����")` | Decompress a gzip encoded string. |
| `env("iface.ipv4")` | Read a variable. |
| `env("foo", "bar")` | Set a variable. |

