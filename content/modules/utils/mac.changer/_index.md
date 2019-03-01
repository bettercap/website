---
title: "mac.changer"
date: 2019-02-25T13:33:00+01:00
draft: false
weight: 1
---

Change the selected interface mac address.

### Commands

#### `mac.changer on`

Start the mac changer module.

#### `mac.changer off`

Stop the mac changer module and restore the original mac address.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `mac.changer.iface` | `<interface name>` | Name of the interface to use. | 
| `mac.changer.address` |  `<random mac>` | Hardware address to apply to the interface. |
