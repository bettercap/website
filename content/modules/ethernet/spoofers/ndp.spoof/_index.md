---
title: "ndp.spoof (IPv6)"
date: 2021-04-12T13:02:36+01:00
draft: false
weight: 5
---

This module performs [IPv6 neighbor spoofing](https://packetlife.net/blog/2009/feb/2/ipv6-neighbor-spoofing/) by sending crafted neighbor and router advertisement packets.

### Commands

#### `ndp.spoof on`

Start NDP spoofer.

#### `ndp.spoof off`

Stop NDP spoofer.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `ndp.spoof.neighbour` | `fe80::1` | Neighbour IPv6 address to spoof, clear to disable NA. |
| `ndp.spoof.prefix` | `d00d::` | IPv6 prefix for router advertisements spoofing, clear to disable RA. |
| `ndp.spoof.prefix.length` | `64` | IPv6 prefix length for router advertisements. |
| `ndp.spoof.targets` | | Comma separated list of IPv6 victim addresses. |