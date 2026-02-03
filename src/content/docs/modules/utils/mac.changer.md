---
title: mac.changer
description: Change the selected interface mac address.
---

Change the selected interface mac address.

## Commands

### `mac.changer on`

Start the mac changer module.

### `mac.changer off`

Stop the mac changer module and restore the original mac address.

## Parameters

| Parameter             | Default            | Description                                 |
| --------------------- | ------------------ | ------------------------------------------- |
| `mac.changer.address` | `<random mac>`     | Hardware address to apply to the interface. |
| `mac.changer.iface`   | `<interface name>` | Name of the interface to use.               |
