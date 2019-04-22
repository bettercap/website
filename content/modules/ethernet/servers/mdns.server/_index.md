---
title: "mdns.server"
date: 2019-02-25T13:25:15+01:00
draft: false
weight: 3
---

A mDNS server module to create multicast services or spoof existing ones.

### Commands

#### `mdns.server on`

Start the mDNS server in the background.

#### `mdns.server off`

Stop the mDNS server in the background.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `mdns.server.address` | `<interface address>` | IPv4 address of the mDNS service. |
| `mdns.server.address6` | `<interface ipv6 address>` | IPv6 address of the mDNS service. |
| `mdns.server.domain` | `local.` | mDNS domain. |
| `mdns.server.host` | `<hostname>.` | mDNS hostname to advertise on the network. |
| `mdns.server.info` | `rpBA=DE:AD:BE:EF:CA:FE ...` | Comma separated list of informative TXT records for the mDNS server. |
| `mdns.server.port` | `52377` | Port of the mDNS service. |
| `mdns.server.service` | `_companion-link._tcp.` | mDNS service name to advertise on the network. |
