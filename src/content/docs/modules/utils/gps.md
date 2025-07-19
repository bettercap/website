---
title: gps
description: This module can be used to obtain GPS coordinates from any receiver which exposes a serial interface.
---

This module can be used to obtain GPS coordinates from any receiver which exposes a serial interface.

### Commands

#### `gps on`

Start acquiring from the GPS hardware.

#### `gps off`

Stop acquiring from the GPS hardware.

#### `gps.show`

Show the last coordinates returned by the GPS hardware.

#### `gps.set LAT LON`

Manually set GPS location.

### Parameters

| Parameter      | Default        | Description                         |
| -------------- | -------------- | ----------------------------------- |
| `gps.baudrate` | `19200`        | Baud rate of the GPS serial device. |
| `gps.device`   | `/dev/ttyUSB0` | Serial device of the GPS hardware.  |

### Examples

Turn on GPS, wait for 5 seconds and then show the current coordinates:

```bash
gps on; sleep 5; gps.show
```
