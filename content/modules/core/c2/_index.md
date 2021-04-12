---
title: "c2"
date: 2020-04-12T11:57:21+01:00
draft: false
weight: 7
---

A command&control module that connects to an IRC server for reporting and commands.

### Commands

#### `c2 on`

Start the C2 module.

#### `c2 off`

Stop the C2 module.       

#### `c2.channel.set EVENT_TYPE CHANNEL`

Set a specific channel to report events of this type.

#### `c2.channel.clear EVENT_TYPE`

Clear the channel to use for a specific event type.

#### `c2.template.set EVENT_TYPE TEMPLATE`

Set the reporting template to use for a specific event type.

#### `c2.template.clear EVENT_TYPE` 

Clear the reporting template to use for a specific event type.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `c2.channel.control` | `#events` | IRC channel to receive commands from. |
| `c2.channel.events` | `#events` | IRC channel to send events to. |
| `c2.channel.output` | `#events` | IRC channel to send commands output to. |
| `c2.nick` | `bettercap` | IRC nickname. |
| `c2.operator` | `admin` | IRC nickname of the user allowed to run commands. |
| `c2.password` | `password` | IRC server password. |
| `c2.sasl.password` |  | IRC server SASL password. |
| `c2.sasl.username` |  | IRC SASL username. |
| `c2.server` | `localhost:6697` | IRC server address and port. |
| `c2.server.tls` | `true` | Enable TLS. |
| `c2.server.tls.verify` | `false` | Enable TLS certificate validation. |
| `c2.username` | `bettercap` | IRC username. |