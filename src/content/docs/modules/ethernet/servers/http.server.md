---
title: http.server
description: A simple HTTP server, used to serve files and scripts across the network.
---

A simple HTTP server, used to serve files and scripts across the network.

### Commands

#### `http.server on`

Start the HTTP server in the background.

#### `http.server off`

Stop the HTTP server in the background.

### Parameters

| Parameter             | Default               | Description                         |
| --------------------- | --------------------- | ----------------------------------- |
| `http.server.address` | `<interface address>` | Address to bind the http server to. |
| `http.server.path`    | `.`                   | Server folder.                      |
| `http.server.port`    | `80`                  | Port to bind the http server to.    |

### Examples

One liner to serve `/var/www/html`:

```bash
sudo bettercap -eval "set http.server.path /var/www/html; http.server on"
```
