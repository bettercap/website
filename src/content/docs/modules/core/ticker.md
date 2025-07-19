---
title: ticker
description: The ticker module can be used to execute a given set of commands periodically in the interactive session.
---

The ticker module can be used to execute a given set of commands periodically in the interactive session.

### Commands

#### `ticker on`

Start the main ticker.

#### `ticker off`

Stop the main ticker.

#### `ticker.create NAME PERIOD COMMANDS`

Create and start a named ticker called `NAME` that will execute the given `COMMANDS` every `PERIOD`.

#### `ticker.destroy NAME`

Stop the named ticker called `NAME`.

### Parameters

| Parameter         | Default                           | Description                                              |
| ----------------- | --------------------------------- | -------------------------------------------------------- |
| `ticker.commands` | `clear; net.show; events.show 20` | List of commands for the main ticker separated by a `;`. |
| `ticker.period`   | `1`                               | Main ticker period in seconds.                           |

### Examples

#### Main ticker

Start probing for hosts, clear the screen and plot discovered endpoints every second (will use default parameters):

```bash
net.probe on; clear; ticker on
```

Keep deauthenticating clients from the access point with BSSID `DE:AD:BE:EF:DE:AD` every five seconds:

```bash
set ticker.period 5; set ticker.commands "wifi.deauth DE:AD:BE:EF:DE:AD"; ticker on
```

#### Named ticker

Keep deauthenticating clients from the access point with BSSID `DE:AD:BE:EF:DE:AD` every five seconds with a named ticker called `deauthenticator`:

```bash
ticker.create deauthenticator 5 "wifi.deauth DE:AD:BE:EF:DE:AD"
```
