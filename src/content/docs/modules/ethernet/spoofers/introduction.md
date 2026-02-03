---
title: Introduction
description: Spoofing modules used to perform Man-in-the-Middle attacks.
sidebar:
  order: 1
---

**Spoofing modules** enable **Man-in-the-Middle (MITM) attacks** on local networks.

## What is a MITM Attack?

A **man-in-the-middle attack** (MITM) intercepts communication between two parties.
The attacker secretly relays and can alter messages.
Both parties believe they are communicating directly with each other.

### How It Works

The attack follows a simple pattern:

1. **Position**: The attacker places themselves between victim and destination
2. **Intercept**: All traffic flows through the attacker's machine
3. **Relay**: Messages are forwarded, optionally modified

### Network MITM Example

When you connect to a network, the **router** forwards your packets to their destination.

In a MITM attack, we **spoof** the router's address.
The network then considers our device as the router.

![mitm](/img/mitm.jpg)

Once positioned, all network traffic flows through your computer.
This enables:

- **[Sniffing](/modules/ethernet/net.sniff/)**: Capture emails, passwords, cookies
- **[Proxying](/modules/ethernet/proxies/)**: Intercept and modify HTTP/HTTPS requests
- **Injection**: Replace content, kill connections, redirect traffic

## Available Spoofing Modules

| Module | Protocol | Description |
|--------|----------|-------------|
| **[arp.spoof](/modules/ethernet/spoofers/arp.spoof/)** | ARP/IPv4 | Spoof ARP replies to intercept IPv4 traffic |
| **[ndp.spoof](/modules/ethernet/spoofers/ndp.spoof/)** | NDP/IPv6 | Spoof neighbor advertisements for IPv6 networks |
| **[dns.spoof](/modules/ethernet/spoofers/dns.spoof/)** | DNS | Reply to DNS queries with spoofed responses |
| **[dhcp6.spoof](/modules/ethernet/spoofers/dhcp6.spoof/)** | DHCPv6 | Attack Windows hosts via DHCPv6 responses |
