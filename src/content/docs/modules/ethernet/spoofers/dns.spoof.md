---
title: dns.spoof
description: Replies to DNS queries with spoofed responses.
---

Replies to **DNS queries** with **spoofed responses**.

:::note
To receive DNS queries from other hosts and spoof domain names, activate either:
- [arp.spoof](/modules/ethernet/spoofers/arpspoof/)
- [dhcp6.spoof](/modules/ethernet/spoofers/dhcp6spoof/)
:::

## Commands

### `dns.spoof on`

Start the **DNS spoofer** in the background.

### `dns.spoof off`

Stop the **DNS spoofer**.

## Parameters

| Parameter           | Default               | Description                                                                                                         |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `dns.spoof.address` | `<interface address>` | IP address to map the domains to.                                                                                   |
| `dns.spoof.all`     | `false`               | If true, replies to **every** DNS request. Otherwise, only replies to requests targeting local PC. |
| `dns.spoof.domains` |                       | Comma separated values of domain names to spoof.                                                                    |
| `dns.spoof.hosts`   |                       | If not empty, this hosts file will be used to map domains to IP addresses.                                          |
| `dns.spoof.ttl`     | `1024`                | TTL of spoofed DNS replies.                                                                                         |

## Examples

Every DNS request coming to this computer for the `example.com` domain will resolve to the address `1.2.3.4`:

```bash
set dns.spoof.domains example.com; set dns.spoof.address 1.2.3.4; dns.spoof on
```

Use a hosts file instead of the `dns.spoof.*` parameters for multiple mappings:

```bash
!cat ./dns.spoof.hosts
# Output:
1.2.3.4 facebook.com
1.2.3.5 cnn.com
1.2.4.6 www.google.com

set dns.spoof.hosts ./dns.spoof.hosts; dns.spoof on
```
