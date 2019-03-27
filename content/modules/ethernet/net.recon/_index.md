---
title: "net.recon"
date: 2019-02-25T12:50:16+01:00
draft: false
weight: 1
---

This module is responsible for periodically reading the system ARP table in order to detect new hosts on the network.

### Commands

#### `net.recon on`

Start network hosts discovery.

#### `net.recon off`

Stop network hosts discovery.

#### `net.clear`

Clear all endpoints collected by the hosts discovery module.

#### `net.show`

Show cache hosts list (default sorting by ip).

#### `net.show ADDRESS1, ADDRESS2`

Show information about a specific list of addresses (by IP or MAC).

#### `net.show.meta ADDRESS1, ADDRESS2`

Show metadata (mDNS, UPnP, open ports, etc) about a specific list of addresses (by IP or MAC).

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `net.show.meta` | `false` | If true, the net.show command will show all metadata collected about each endpoint. |
| `net.show.filter` | |  Defines a regular expression filter for `net.show`.|
| `net.show.sort` | `ip asc` | Defines sorting field (`ip`, `mac`, `seen`, `sent`, `rcvd`) and direction (`asc` or `desc`) for `net.show`. |
| `net.show.limit` | `0` | If greater than zero, defines limit for `net.show`. |

### Examples

Sort by IP and filter for MAC addresses starting with `B8`:

```
> set net.show.sort ip asc
> set net.show.filter ^B8
> net.show
```

Filter by endpoints with the string `Apple` in their hostname or vendor fields:

```
> set net.show.filter Apple
> net.show
```

Show top 10 endpoints sorted by last activity timestamp:

```
> set net.show.sort seen desc
> set net.show.limit 10
> net.show
```
