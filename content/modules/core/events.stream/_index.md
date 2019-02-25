---
title: "events.stream"
date: 2019-02-25T11:46:40+01:00
draft: false
weight: 1
---

This module is enabled by default and is responsible for reporting events (logs, new hosts being found, etc) during your interactive session and programmatically execute commands when specific events occur.

### Basic Commands

| command | description |
|---------|-------------|
| `events.stream on` | Start the events stream. |
| `events.stream off` | Stop the events stream. |
| `events.show LIMIT?` | Show the events stream ( `LIMIT` is an optional parameter ). |
| `events.ignore FILTER` | Events with an identifier matching this filter will not be shown (use multiple times to add more filters). | 
| `events.include FILTER` | Used to remove filters passed with the events.ignore command. |
| `events.filters.clear` | Clear the list of filters passed with the `events.ignore` command. |
| `events.clear` | Clear the events stream buffer. |

### Advanced

| command | description |
|---------|-------------|
| `events.waitfor TAG TIMEOUT?` | Wait for an event with the given tag either forever or for a timeout in seconds. |
| `events.on TAG COMMANDS` | Run COMMANDS when an event with the specified TAG is triggered (supports [XPath queries on JSON](https://github.com/antchfx/xpath) between brackets, like `{{Client\mac}}` ). |
| `events.triggers` | Show the list of event triggers created by the `events.on` command. |
| `events.trigger.delete TRIGGER_ID` | Remove an event trigger given its TRIGGER_ID (use `events.triggers` to see the list of triggers). |
| `events.triggers.clear` | Remove all event triggers (use `events.triggers` to see the list of triggers). |

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `events.stream.output` |  | If not empty, events will be written to this file instead of the standard output. |
| `events.stream.output.rotate` | `true` | If true will enable log rotation. |
| `events.stream.output.rotate.compress` | `true` | If true will enable log rotation compression. |
| `events.stream.output.rotate.how` | `size` | Rotate by `size` or `time`. |
| `events.stream.output.rotate.when` | `10485760` | File size or time duration in seconds for log rotation. |
| `events.stream.output.rotate.format` | `2006-01-02 15:04:05` | Datetime format to use for log rotation file names. |
| `events.stream.http.request.dump` | `false` | If true all HTTP requests will be dumped. |
| `events.stream.http.response.dump` | `false` | If true all HTTP responses will be dumped. |

### Examples

Start bettercap without colors and terminal effects and write events to the file `~/bettercap-events.log`:

```sh
bettercap -no-colors -eval "set events.stream.output ~/bettercap-events.log"
```

Show every event:

    > events.show

Show the last 5 events, sleep one second and then clear the buffer:

    > events.show 5; sleep 1; events.clear

Start discovering BLE devices and wait that at least one is detected:

    > ble.recon on; events.waitfor ble.device.new

The same but with a timeout of 10 seconds:

    > ble.recon on; events.waitfor ble.device.new 10

Ignore events from WiFi clients while using one of the [wifi modules](https://github.com/bettercap/bettercap/wiki/wifi):

    > events.ignore wifi.client. 

Whenever a `wifi.client.new` event happens, execute the command `wifi.deauth {{Client/mac}}`, the expression `Client/mac` will be parsed as an [XPath query on JSON](https://github.com/antchfx/xpath) at runtime (for a list of available fields, `api.rest on` and visit `http://ip:8081/api/events` to see what's inside your event of interest):

    > events.on wifi.client.new wifi.deauth {{Client/mac}}

Start bettercap while muting events of the `net.recon` module ( new endpoint found, endpoint lost, etc ), sleep for one second and then enable them back (used to suppress initial discovery messages):

    $ sudo bettercap -eval "events.ignore endpoint.; sleep 1; events.include endpoint."

