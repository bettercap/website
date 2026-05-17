---
title: ssh.proxy
description: A SSH MITM proxy that intercepts SSH connections, logs authentication credentials and all plaintext session traffic, and forwards transparently to the real destination.
---

A **SSH man-in-the-middle proxy** that transparently intercepts SSH connections.
It presents its own host key to the client, captures plaintext credentials (password and public-key authentication attempts), logs all session data (commands, output), and forwards traffic to the real SSH destination.

When used with a [spoofer](/modules/ethernet/spoofers/introduction/), all SSH traffic on the target port is redirected to this proxy automatically.
On Linux the original destination is resolved via `SO_ORIGINAL_DST`; on macOS via the `pf` state table.

## Commands

### `ssh.proxy on`

Start the SSH MITM proxy.

### `ssh.proxy off`

Stop the SSH MITM proxy.

## Parameters

| Parameter           | Default               | Description                                                                                                                               |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ssh.address`       |                       | Remote address to forward SSH connections to. Leave empty to auto-detect the original destination from the NAT table (Linux via `SO_ORIGINAL_DST`, macOS via `pf` state table). |
| `ssh.port`          | `22`                  | Remote SSH port to intercept.                                                                                                             |
| `ssh.proxy.address` | `<interface address>` | Address to bind the SSH proxy to.                                                                                                         |
| `ssh.proxy.port`    | `2222`                | Port to bind the SSH proxy to.                                                                                                            |
| `ssh.proxy.hostkey` |                       | Path to a PEM-encoded private key used as the proxy host key. If empty, an ephemeral ECDSA P-256 key is generated automatically.         |
| `ssh.proxy.script`  |                       | Path of a SSH proxy JS script.                                                                                                            |

## Scripting

The `ssh.proxy` module can be scripted using JavaScript files that may declare the following functions:

```js
// called when the script is loaded
function onLoad() {
  // ...
}

// called when data is available on an SSH channel
// sessionID: string like "1.2.3.4:12345->5.6.7.8:22[session]"
// direction: "client->server" or "server->client"
// data: ByteArray
// return: modified ByteArray, or null/undefined to keep original
function onSSHData(sessionID, direction, data) {
  log(sessionID + " " + direction + ": " + data.length + " bytes")
  // optionally modify and return the data buffer
  return data
}
```

## Builtin Functions

The JS interpreter is [limited to ES5](https://github.com/robertkrimen/otto?tab=readme-ov-file#caveat-emptor) (no for/of, typed arrays, classes... )

Scripts can use the following builtin functions.

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

## Examples

Intercept all SSH traffic on the local network using ARP spoofing (auto-detect destination per connection):

```bash
# enable full-duplex ARP spoofing
set arp.spoof.fullduplex true

# start the SSH MITM proxy on port 2222, intercepting SSH port 22
set ssh.port 22
set ssh.proxy.port 2222

ssh.proxy on
arp.spoof on
```

Intercept SSH connections to a specific host only:

```bash
set ssh.address 192.168.1.10
set ssh.port 22
set ssh.proxy.port 2222

ssh.proxy on
arp.spoof on
```
