---
title: "net.probe"
date: 2019-02-25T12:51:29+01:00
draft: false
weight: 2
---

When activated, this module will send different types of probe packets to each IP in the current subnet in order for the [net.recon](/modules/ethernet/net.recon/) module to detect them.

### Commands

#### `net.probe on`

Start the prober.
#### `net.probe off`

Stop the prober.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `net.probe.throttle` | `10` | If greater than 0, probe packets will be throttled by this value in milliseconds. | 
| `net.probe.mdns` | `true` | Enable mDNS discovery probes. | 
| `net.probe.nbns` | `true` | Enable NetBIOS name system (NBNS) discovery probes. | 
| `net.probe.upnp` | `true` | Enable UPnP discovery probes. | 
| `net.probe.wsd` | `true` | Enable WSD discovery probes. | 
