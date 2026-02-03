---
title: CAN-bus
description: This module supports scanning, injecting and fuzzing CAN-bus frames via socketcan compatible adapters.
sidebar:
  order: 5
---

This module supports scanning, injecting and fuzzing CAN-bus frames via socketcan compatible adapters.

## Commands

### `can.recon on`

Start CAN-bus discovery.

### `can.recon off`

Stop CAN-bus discovery.

### `can.clear`

Clear everything collected by the discovery module.

### `can.show`

Show a list of detected CAN devices.

### `can.dbc.load NAME`

Load a DBC file from the list of available ones or from disk.

### `can.inject FRAME_EXPRESSION`

Parse FRAME_EXPRESSION as 'id#data' and inject it as a CAN frame.

### `can.fuzz ID_OR_NODE_NAME OPTIONAL_SIZE`

If an hexadecimal frame ID is specified, create a randomized version of it and inject it. If a node name is specified, a random message for the given node will be instead used.

## Parameters

| Parameter         | Default | Description                                                                  |
| ----------------- | ------- | ---------------------------------------------------------------------------- |
| `can.device`      | `can0`  | CAN-bus device.                                                              |
| `can.dump`        |         | Load CAN traffic from this candump log file.                                 |
| `can.dump.inject` | `false` | Write CAN traffic read form the candump log file to the selected can.device. |
| `can.filter`      |         | Optional boolean expression to select frames to report.                      |
| `can.parse.obd2`  | `false` | Enable built in OBD2 PID parsing.                                            |
| `can.transport`   | `can`   | Network type, can be 'can' for SocketCAN or 'udp'.                           |

## Examples

### Read, write and fuzz raw frames

The very basic of CAN-bus functionalities. Set your device and enable the module to start reading raw frames:

```bash
set can.device /dev/can0

can.recon on
```

You can also load and **replay** a dump previously captured with candump:

```bash
set can.dump obd2-candump-2023-11-22_031813.log

can.recon on
```

Inject raw frames as `id#hex-data`:

```bash
can.inject 0#aabbccddee
```

Or generate random ones for fuzzing with `can.fuzz id size`:

```bash
can.fuzz ff 8
```

And show a list of the detected ECUs:

```bash
can.show
```

### Load your own DBC files, decode traffic and fuzz with them

You can use **DBC files** that describe a specific protocol.
Bettercap will parse every frame automatically.

Good sources: [css-electronics](https://www.csselectronics.com/pages/obd2-dbc-file) and [comma.ai](https://github.com/commaai/opendbc).

```bash
set can.device /dev/can0

can.dbc.load css-electronics/obd2-pack-v5/obd2-dbc/CSS-Electronics-11-bit-OBD2-v2.2.dbc

can.recon on
```

When running with a DBC, you'll also be able to use use it for fuzzing. For instance, to generate a specific message given its id, with randomized content:

```bash
can.fuzz 12
```

To instead pick a random message from a specific ECU and generate its contents randomly:

```bash
can.fuzz ECU_name
```

### Decode OBD2 PIDs with builtin decoder

For **OBD2 standard PIDs**, you can use the builtin parser instead of a DBC:

```bash
set can.device /dev/can0
set can.parse.obd2 true
can.recon on
```
