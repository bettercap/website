---
title: "dns.spoof"
date: 2019-02-25T13:01:48+01:00
draft: false
weight: 2
---

Replies to DNS queries with spoofed responses.

{{% notice info %}}
In order to receive DNS queries from other hosts other than your own and be therefore able to spoof the selected domain names, you'll also need to activate either the [arp.spoof](/modules/ethernet/spoofers/arp.spoof/) or the [dhcp6.spoof](/modules/ethernet/spoofers/dhcp6.spoof/) module.
{{% /notice %}}

### Commands

#### `dns.spoof on`

Start the DNS spoofer in the background.
#### `dns.spoof off`

Stop the DNS spoofer in the background.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `dns.spoof.domains` |  | Comma separated values of domain names to spoof. | 
| `dns.spoof.address` |  `<interface address>` | IP address to map the domains to. |
| `dns.spoof.all` | `false` | If true the module will reply to every DNS request, otherwise it will only reply to the one targeting the local pc. |
| `dns.spoof.hosts` |   | If not empty, this hosts file will be used to map domains to IP addresses. |

### Examples

Every DNS request coming to this computer for the `example.com` domain will resolve to the address `1.2.3.4`:

    > set dns.spoof.domains example.com; set dns.spoof.address 1.2.3.4; dns.spoof on

Use a hosts file instead of the `dns.spoof.*` parameters for multiple mappings:

    > !cat ./dns.spoof.hosts
    
    1.2.3.4 facebook.com
    1.2.3.5 cnn.com
    1.2.4.6 www.google.com

    > set dns.spoof.hosts ./dns.spoof.hosts; dns.spoof on
