---
title: "dns.proxy"
date: 2025-07-14T19:43:00+01:00
draft: false
weight: 6
---

A full featured DNS proxy that can manipulate DNS traffic in real-time.  
It can be used for DNS spoofing, redirection, logging, or injection of custom DNS responses.

It supports **UDP**, **TCP**, and **TCP-TLS** protocols, with automatic generation of a self-signed certificate if needed.

Additionally, `dns.proxy` can be scripted using JavaScript modules, similarly to `http.proxy` and `https.proxy`, to manipulate requests and responses dynamically.

## Commands

### `dns.proxy on`

Start the DNS proxy.

### `dns.proxy off`

Stop the DNS proxy.

## Parameters

| Parameter               | Default                    | Description                                                                                 |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| `dns.port`              | `53`                       | DNS port to redirect when the proxy is activated.                                           |
| `dns.proxy.address`     | `<interface address>`      | Address to bind the DNS proxy to.                                                           |
| `dns.proxy.blacklist`   |                            | Comma separated list of client IPs to skip while proxying (wildcard allowed).               |
| `dns.proxy.whitelist`   |                            | Comma separated list of client IPs to proxy if the blacklist is used.                       |
| `dns.proxy.nameserver`  | `1.1.1.1`                  | DNS resolver address.                                                                       |
| `dns.proxy.port`        | `8053`                     | Port to bind the DNS proxy to.                                                              |
| `dns.proxy.protocol`    | `udp`                      | Network protocol for the DNS proxy server to use. Accepted values: `udp`, `tcp`, `tcp-tls`. |
| `dns.proxy.redirect`    | `true`                     | Enable or disable port redirection with iptables.                                           |
| `dns.proxy.certificate` | `~/.bettercap-ca.cert.pem` | DNS proxy certification authority TLS certificate file.                                     |
| `dns.proxy.key`         | `~/.bettercap-ca.key.pem`  | DNS proxy certification authority TLS key file.                                             |
| `dns.proxy.script`      |                            | Path of a JS proxy script.                                                                  |

### Modules

The `dns.proxy` module can be scripted using JavaScript files that must declare at least one of the following functions:

```js
// called when the script is loaded
function onLoad() {
  // ...
}

// called when the DNS request is received by the proxy
// and before it is sent to the real resolver.
function onRequest(req, res) {
  // ...
}

// called when the DNS request is sent to the real resolver
// and a response is received.
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

#### Builtin Functions

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
