---
title: zerogod
description: This module is a DNS-SD / mDNS / Bonjour / Zeroconf module for device discovery, service spoofing, and impersonation.
sidebar:
  order: 3
  badge: New
---

This module is a DNS-SD / mDNS / Bonjour / Zeroconf module for device discovery, service spoofing, and impersonation.

It allows you to **scan the local network for mDNS services**, **impersonate discovered services**, and **advertise custom services**.

## Commands

### `zerogod.discovery on`

Start DNS-SD / mDNS discovery.

### `zerogod.discovery off`

Stop DNS-SD / mDNS discovery.

### `zerogod.show ADDRESS`

Show discovered services given an `ADDRESS`.

### `zerogod.show-full ADDRESS`

Show discovered services **and DNS records** given an `ADDRESS`.

### `zerogod.save ADDRESS FILENAME`

Save the mDNS information of a given `ADDRESS` in the `FILENAME` yaml file.

### `zerogod.advertise FILENAME`

Start advertising the mDNS services from the `FILENAME` yaml file.

To stop advertising, use:

```bash
zerogod.advertise off
```

### `zerogod.impersonate ADDRESS`

Impersonate `ADDRESS` by advertising its services.
Captures service data, stores it in a temp YAML file, and starts advertising.

To stop impersonation, use:

```bash
zerogod.impersonate off
```

## Parameters

| Parameter                       | Default                           | Description                                                                                                  |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `zerogod.advertise.certificate` | `~/.bettercap-zerogod.cert.pem`   | TLS certificate file (will be auto generated if filled but not existing) to use for advertised TCP services. |
| `zerogod.advertise.key`         | `~/.bettercap-zerogod.key.pem`    | TLS key file (will be auto generated if filled but not existing) to use for advertised TCP services.         |
| `zerogod.ipp.save_path`         | `~/.bettercap/zerogod/documents/` | If an IPP acceptor is started, this setting defines where to save documents received for printing.           |
| `zerogod.verbose`               | `false`                           | Log every mDNS query.                                                                                        |

## Examples

### Discover services on the local network

Start the mDNS discovery:

```bash
zerogod.discovery on
```

Stop discovery:

```bash
zerogod.discovery off
```

### Show services of a specific IP

```bash
zerogod.show 192.168.1.42
```

Show **all available records** (including DNS details):

```bash
zerogod.show-full 192.168.1.42
```

### Save service information for later

Save the discovered data for a given IP to a YAML file:

```bash
zerogod.save 192.168.1.42 target-services.yml
```

### Replay and advertise services

Load and advertise previously saved services:

```bash
zerogod.advertise target-services.yml
```

Stop advertising:

```bash
zerogod.advertise off
```

### Impersonate a device on the network

Impersonate all services of a device with a given IP:

```bash
zerogod.impersonate 192.168.1.42
```

Stop impersonation:

```bash
zerogod.impersonate off
```
