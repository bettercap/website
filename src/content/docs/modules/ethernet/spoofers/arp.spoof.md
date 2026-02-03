---
title: arp.spoof
description: This module keeps spoofing selected hosts on the network using crafted ARP packets in order to perform a MITM attack.
---

This module spoofs selected hosts on the network using **crafted ARP packets**.
It enables [MITM attacks](/modules/ethernet/spoofers/introduction/#what-is-a-mitm-attack) by redirecting traffic through your machine.

## Commands

### `arp.spoof on`

Start the **ARP spoofer**.

### `arp.ban on`

Start **ARP spoofer** in ban mode.
Target connectivity will not work.

### `arp.spoof off` / `arp.ban off`

Stop the **ARP spoofer**.

## Parameters

| Parameter                | Default           | Description                                                                                                                                                                     |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arp.spoof.fullduplex`   | `false`           | If true, both the targets and the gateway will be attacked, otherwise only the target (**if the router has ARP spoofing protections in place this will make the attack fail**). |
| `arp.spoof.internal`     | `false`           | If true, local connections among computers of the network will be spoofed as well, otherwise only connections going to and coming from the external network.                    |
| `arp.spoof.skip_restore` | `false`           | If set to true, targets arp cache won't be restored when spoofing is stopped.                                                                                                   |
| `arp.spoof.targets`      | `<entire subnet>` | A comma separated list of MAC addresses, IP addresses, IP ranges or aliases to spoof ([a list of supported range formats](https://github.com/malfunkt/iprange)).                |
| `arp.spoof.whitelist`    |                   | A comma separated list of MAC addresses, IP addresses, IP ranges or aliases to skip while spoofing.                                                                             |

## Examples

Ban the address `192.168.1.6` from the network:

```bash
set arp.spoof.targets 192.168.1.6; arp.ban on
```

Spoof `192.168.1.2`, `192.168.1.3` and `192.168.1.4`:

```bash
set arp.spoof.targets 192.168.1.2-4; arp.spoof on
```
