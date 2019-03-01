---
title: "http.server"
date: 2019-02-25T13:25:15+01:00
draft: false
weight: 1
---

A simple HTTP server, used to serve files and scripts across the network.

### Commands

#### `http.server on`

Start the HTTP server in the background.

#### `http.server off`

Stop the HTTP server in the background.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `http.server.path` | `.` | Server folder. | 
| `http.server.address` |  `<interface address>` | Address to bind the http server to. |
| `http.server.port` | `80` | Port to bind the http server to. |

### Examples

One liner to serve `/var/www/html`:

```sh
sudo bettercap -eval "set http.server.path /var/www/html; http.server on"
```
