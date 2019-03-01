---
title: "wake on lan"
date: 2019-02-25T12:55:00+01:00
draft: false
weight: 5
---

A module to send [Wake On LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) packets in broadcast or to a specific MAC.

### Commands

#### `wol.eth MAC`

Send a WOL as a raw ethernet packet of type 0x0847 (if no MAC is specified, `ff:ff:ff:ff:ff:ff` will be used).
#### `wol.udp MAC`

Send a WOL as an IPv4 broadcast packet to UDP port 9 (if no MAC is specified, `ff:ff:ff:ff:ff:ff` will be used).
