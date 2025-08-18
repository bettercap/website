---
title: http.proxy
description: A full featured HTTP transparent proxy that can be scripted using JavaScript modules.
---

A full featured HTTP transparent proxy that can be scripted using JavaScript modules. If used together with a [spoofer](/modules/ethernet/spoofers/introduction/), all HTTP traffic will be redirected to it and it will automatically handle port redirections as needed.

### Commands

#### `http.proxy on`

Start the HTTP proxy.

#### `http.proxy off`

Stop the HTTP proxy.

### Parameters

| Parameter              | Default               | Description                                                                                             |
| ---------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| `http.port`            | `80`                  | HTTP port to redirect when the proxy is activated.                                                      |
| `http.proxy.address`   | `<interface address>` | Address to bind the HTTP proxy to.                                                                      |
| `http.proxy.blacklist` |                       | Comma separated list of hostnames to skip while proxying (wildcard expressions can be used).            |
| `http.proxy.injectjs`  |                       | URL, path or javascript code to inject into every HTML page.                                            |
| `http.proxy.port`      | `8080`                | Port to bind the HTTP proxy to.                                                                         |
| `http.proxy.redirect`  | `true`                | Enable or disable port redirection with iptables.                                                       |
| `http.proxy.script`    |                       | Path of a proxy module script.                                                                          |
| `http.proxy.sslstrip`  | `false`               | Enable or disable SSL stripping.                                                                        |
| `http.proxy.whitelist` |                       | Comma separated list of hostnames to proxy if the blacklist is used (wildcard expressions can be used). |

### Modules

The `http.proxy` and `https.proxy` modules can be scripted using javascript files that must declare at least one of the following functions:

```js
// called when the script is loaded
function onLoad() {
  // ...
}

// called when the module is stopped
function onExit() {
  // ...
}

// called when the request is received by the proxy
// and before it is sent to the real server.
function onRequest(req, res) {
  // ...
}

// called when the request is sent to the real server
// and a response is received
function onResponse(req, res) {
  // ...
}

// called every time an unknown session command is typed,
// proxy modules can optionally handle custom commands this way:
function onCommand(cmd) {
  if (cmd == "test") {
    /*
     * Custom session command logic here.
     */

    // tell the session we handled this command
    return true;
  }
}
```

Modules can change the `req` request and `res` response objects, for instance the [web-override.cap caplet](https://github.com/bettercap/caplets/blob/master/web-override/web-override.cap) is using the `onRequest` function in order to override every request before it is executed with a fake response:

```js
function onRequest(req, res) {
  res.Status = 200;
  res.ContentType = "text/html";
  res.Body = readFile("caplets/www/index.html");
  headers = res.Headers.split("\r\n");
  for (var i = 0; i < headers.length; i++) {
    header_name = headers[i].replace(/:.*/, "");
    res.RemoveHeader(header_name);
  }
  res.SetHeader("Connection", "close");
}
```

The [login-man-abuse.cap caplet](https://github.com/bettercap/caplets/blob/master/login-manager-abuse/login-man-abuse.cap) instead will use the `onResponse` handler to inject its malicious javascript file in every html response:

```js
function onResponse(req, res) {
  if (res.ContentType.indexOf("text/html") == 0) {
    var body = res.ReadBody();
    if (body.indexOf("</head>") != -1) {
      res.Body = body.replace(
        "</head>",
        '<script type="text/javascript">' +
          "\n" +
          AbuserJavascript +
          "</script>" +
          "</head>"
      );
    }
  }
}
```

#### Builtin Functions

The JS interpreter is [limited to ES5](https://github.com/robertkrimen/otto?tab=readme-ov-file#caveat-emptor) (no 
for/of, typed arrays, classes... )

Modules can use the following builtin functions.

| Function                                    | Description                                                                   |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| `readDir("/path/")`                         | Return the contents of a directory as a string array.                         |
| `readFile("/path/to/file")`                 | Return the contents of a file as a string.                                    |
| `writeFile("/path/to/file", "hello world")` | Write the string `hello world` to a file, returns `null` or an error message. |
| `log_debug("message")`                      | Log a message in the interactive session (its level will be `DEBUG`).         |
| `log_info("message")`                       | Log a message in the interactive session (its level will be `INFO`).          |
| `log_warn("message")`                       | Log a message in the interactive session (its level will be `WARNING`).       |
| `log_error("message")`                      | Log a message in the interactive session (its level will be `ERROR`).         |
| `log_fatal("message")`                      | Log a message in the interactive session (its level will be `FATAL`).         |
| `log("message")`                            | Shortcut for `log_info("message")`.                                           |
| `btoa("message")`                           | Encode a message to base64.                                                   |
| `atob("bWVzc2FnZQ==")`                      | Decode a message from base64.                                                 |
| `gzipCompress("plaintext data")`            | Compress a string using gzip encoding.                                        |
| `gzipDecompress(")9�\+�I��+I�(QHI,I����")`  | Decompress a gzip encoded string.                                             |
| `env("iface.ipv4")`                         | Read a variable.                                                              |
| `env("foo", "bar")`                         | Set a variable.                                                               |
| `run("command")`                            | Execute a shell command and return the output as a string.                    |
| `fileExists("/path/to/file")`               | Return `true` if the file exists, otherwise `false`.                          |
| `loadJSON("/path/to/file.json")`            | Load and parse a JSON file, returns a JS object.                              |
| `saveJSON("/path/to/file.json", object)`    | Serialize and save a JS object as JSON to the specified file.                 |
| `saveToFile("/path.txt", "data")`           | Save raw string data to a file.                                               |
| `onEvent("event.tag", callback)`            | Register a JS callback for the given session event tag.                       |
| `removeEventListener("event.tag")`          | Remove a previously registered event listener for the given tag.              |
| `addSessionEvent("tag", data)`              | Trigger a session event from within the script with a custom tag and payload. |

### Examples

Will ARP spoof the whole network, enable sslstrip and inject a "Hello World" javascript alert to every HTML page being visited:

```bash
set http.proxy.injectjs alert("Hello World")
set http.proxy.sslstrip true

http.proxy on
arp.spoof on
```

Only proxy requests for `cnn.com` (including subdomains):

```bash
set http.proxy.blacklist *
set http.proxy.whitelist cnn.com, *.cnn.com
http.proxy on
```
