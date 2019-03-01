---
title: "https.server"
date: 2019-02-25T13:25:21+01:00
draft: false
weight: 2
---

A simple HTTPS server, used to serve files and scripts across the network.

### Commands

#### `https.server on`

Start the HTTP server in the background.

#### `https.server off`

Stop the HTTP server in the background.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `https.server.path` | `.` | Server folder. | 
| `https.server.address` |  `<interface address>` | Address to bind the http server to. |
| `https.server.port` | `443` | Port to bind the http server to. |
| `https.server.certificate` | `~/.bettercap-https.cert.pem` | TLS certificate file (will be auto generated if filled but not existing). |
| `https.server.key` | `~/.bettercap-https.key.pem` | TLS key file (will be auto generated if filled but not existing). |
| `https.server.certificate.bits` | `4096` | Number of bits of the RSA private key of the generated HTTPS certificate. |
| `https.server.certificate.commonname` | `bettercap` | Common Name field of the generated HTTPS certificate. |
| `https.server.certificate.country` | `US` | Country field of the generated HTTPS certificate. |
| `https.server.certificate.locality` | | Locality field of the generated HTTPS certificate. |
| `https.server.certificate.organization` | `bettercap devteam` | Organization field of the generated HTTPS certificate. |
| `https.server.certificate.organizationalunit` | `https://bettercap.org/` | Organizational Unit field of the generated HTTPS certificate. |

### Examples

One liner to serve `/var/www/html`:

```sh
sudo bettercap -eval "set https.server.path /var/www/html; https.server on"
```
