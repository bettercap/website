---
title: "Bluetooth LE"
date: 2019-02-25T11:11:23+01:00
draft: false
weight: 2
---

This module is responsible for Bluetooth Low Energy devices discovery, services enumeration and characteristic writing for unauthenticated devices.

{{% notice warning %}}
This module is not supported on Microsoft Windows and Apple macOS [due to this bug](https://github.com/bettercap/bettercap/issues/74).
{{% /notice %}}

### Commands

#### `ble.recon on` 

Start Bluetooth Low Energy devices discovery.

#### `ble.recon off`

Stop Bluetooth Low Energy devices discovery.

#### `ble.clear` 

Clear all devices collected by the BLE discovery module.

#### `ble.show` 

Show discovered Bluetooth Low Energy devices.

#### `ble.enum MAC`

Enumerate services and characteristics for the given BLE device.

#### `ble.write MAC UUID HEX_DATA` 

Write the `HEX_DATA` buffer to the BLE device with the specified `MAC` address, to the characteristics with the given `UUID`. |

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `ble.device` | `-1` | Index of the HCI device to use, -1 to autodetect. |
| `ble.show.filter` | |  Defines a regular expression filter for `ble.show`.|
| `ble.show.sort` | `rssi asc` | Defines sorting field (`rssi`, `mac`, or `seen`) and direction (`asc` or `desc`) for `ble.show`. |
| `ble.show.limit` | `0` | If greater than zero, defines limit for `ble.show`. |

### Examples

Connect, enumerate and read characteristics from the BLE device `04:52:de:ad:be:ef` (requires `ble.recon on` first):

```
> ble.enum 04:52:de:ad:be:ef
```

Write the bytes `ff ff ff ff ff ff ff ff` to the BLE device `04:52:de:ad:be:ef` on its characteristics with UUID `234bfbd5e3b34536a3fe723620d4b78d` (requires `ble.recon on` first):

```
> ble.write 04:52:de:ad:be:ef 234bfbd5e3b34536a3fe723620d4b78d ffffffffffffffff
```

Hacking a Loccess smartlock using bettercap:

<iframe width="560" height="315" src="https://www.youtube.com/embed/kzRCGxDKPFA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
