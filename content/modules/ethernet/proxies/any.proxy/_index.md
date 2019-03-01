---
title: "any.proxy"
date: 2019-02-25T13:06:12+01:00
draft: false
weight: 1
---

A simple firewall redirection to any custom proxy.

### Commands

#### `any.proxy on`

Start the custom proxy redirection.

#### `any.proxy off`

Stop the custom proxy redirection.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `any.proxy.iface` | `<interface name>` | Interface to redirect packets from. |
| `any.proxy.protocol` | `TCP` | Proxy protocol. |
| `any.proxy.src_port` | `80` | Remote port to redirect when the module is activated. |
| `any.proxy.src_address` | | Leave empty to intercept any source address. |
| `any.proxy.dst_address` | `<interface address>` | Address where the proxy is listening. |
| `any.proxy.dst_port` | `8080` | Port where the proxy is listening. |

### Examples

Redirect all HTTP traffic to a local Burp proxy instance:

```
set any.proxy.dst_address 127.0.0.1
any.proxy on
```
