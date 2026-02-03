---
title: net.probe
description: This module will send different types of probe packets to each IP in the current subnet in order for the net.recon module to detect them.
sidebar:
  order: 1
---

Sends **probe packets** to each IP in the current subnet.
The [net.recon](/modules/ethernet/net.recon/) module uses these to detect hosts.

## Commands

### `net.probe on`

Start the prober.

### `net.probe off`

Stop the prober.

## Parameters

| Parameter            | Default | Description                                                                       |
| -------------------- | ------- | --------------------------------------------------------------------------------- |
| `net.probe.mdns`     | `true`  | Enable mDNS discovery probes.                                                     |
| `net.probe.nbns`     | `true`  | Enable NetBIOS name system (NBNS) discovery probes.                               |
| `net.probe.throttle` | `10`    | If greater than 0, probe packets will be throttled by this value in milliseconds. |
| `net.probe.upnp`     | `true`  | Enable UPnP discovery probes.                                                     |
| `net.probe.wsd`      | `true`  | Enable WSD discovery probes.                                                      |
