---
title: syn.scan
description: A module to perform SYN port scanning
sidebar:
  order: 5
---

A module to perform SYN port scanning, as open ports are discovered the `tcp-ports` meta field of the endpoints will be filled and it will be shown in the
[net.show](/modules/ethernet/net.recon/#net-show) view if [net.show.meta](/modules/ethernet/net.recon/#parameters) is set to `true`.

## Commands

### `syn.scan IP-RANGE START-PORT END-PORT?`

Perform a syn port scanning against an IP address within the provided ports range.

### `syn.scan stop`

Stop the current syn scanning session.

### `syn.scan.progress`

Print progress of the current syn scanning session.

## Parameters

| Parameter                      | Default | Description                                            |
| ------------------------------ | ------- | ------------------------------------------------------ |
| `syn.scan.show-progress-every` | `1`     | Period in seconds for the scanning progress reporting. |

## Examples

Scan a single ip for ports `1` to `1000`:

```bash
syn.scan 192.168.1.3 1 1000
```

Scan several addresses for port `22`:

```bash
syn.scan 192.168.1.1-50 22
```

Scan the entire subnet for ports `1` to `10000`:

```bash
syn.scan 192.168.1.0/24 1 10000
```
