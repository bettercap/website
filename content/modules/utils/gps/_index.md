---
title: "gps"
date: 2019-02-25T13:33:04+01:00
draft: false
weight: 2
---

This module can be used to obtain GPS coordinates from any receiver which exposes a serial interface.

### Commands

#### `gps on`

Start acquiring from the GPS hardware.

#### `gps off`

Stop acquiring from the GPS hardware.

#### `gps.show`

Show the last coordinates returned by the GPS hardware.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `gps.device` | `/dev/ttyUSB0` | Serial device of the GPS hardware. | 
| `gps.baudrate` |  `19200` | Baud rate of the GPS serial device. |

### Examples

Turn on GPS, wait for 5 seconds and then show the current coordinates:

```
> gps on; sleep 5; gps.show
```
