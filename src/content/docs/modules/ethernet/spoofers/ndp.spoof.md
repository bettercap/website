---
title: ndp.spoof (IPv6)
description: This module performs IPv6 neighbor spoofing by sending crafted neighbor and router advertisement packets.
---

This module performs [IPv6 neighbor spoofing](https://packetlife.net/blog/2009/feb/2/ipv6-neighbor-spoofing/) by sending crafted neighbor and router advertisement packets.

## Commands

### `ndp.spoof on`

Start NDP spoofer.

### `ndp.ban on`

Start NDP spoofer in ban mode, meaning the target(s) connectivity will not work.

### `ndp.spoof off` / `ndp.ban off`

Stop NDP spoofer.

## Parameters

| Parameter                   | Default   | Description                                                          |
| --------------------------- | --------- | -------------------------------------------------------------------- |
| `ndp.spoof.neighbour`       | `fe80::1` | Neighbour IPv6 address to spoof, clear to disable NA.                |
| `ndp.spoof.prefix`          | `d00d::`  | IPv6 prefix for router advertisements spoofing, clear to disable RA. |
| `ndp.spoof.prefix.length`   | `64`      | IPv6 prefix length for router advertisements.                        |
| `ndp.spoof.router_lifetime` | `10`      | Router lifetime for router advertisements in seconds.                |
| `ndp.spoof.targets`         |           | Comma separated list of IPv6 victim addresses.                       |
