---
title: packet.proxy
description: A module that relies on NFQUEUEs in order to actively filter packets, using Go native plugins.
---

A module that relies on [NFQUEUEs](https://home.regit.org/netfilter-en/using-nfqueue-and-libnetfilter_queue/) in order to actively filter packets, using [Go native plugins](https://golang.org/pkg/plugin/) (plugins for this module can be found [in this repository](https://github.com/bettercap/packet.proxy-plugins)).

:::caution
This module is only supported on GNU/Linux.

:::

## Commands

### `packet.proxy on`

Start the NFQUEUE based packet proxy.

### `packet.proxy off`

Stop the NFQUEUE based packet proxy.

## Parameters

| Parameter                | Default  | Description                                                                                  |
| ------------------------ | -------- | -------------------------------------------------------------------------------------------- |
| `packet.proxy.chain`     | `OUTPUT` | Chain name of the iptables rule.                                                             |
| `packet.proxy.plugin`    |          | Go plugin file to load and call for every packet.                                            |
| `packet.proxy.queue.num` | `0`      | NFQUEUE number to create and bind to.                                                        |
| `packet.proxy.rule`      |          | Any additional iptables rule to make the queue more selective (ex. `--destination 8.8.8.8`). |

## Plugins

This module requires **native Go plugins** for performance.
The `packet.proxy.plugin` parameter is mandatory.
Provide the path to a [Go plugin](https://golang.org/pkg/plugin/) exporting an `OnPacket` callback:

```go
// test.go
package main

import (
	"github.com/bettercap/bettercap/v2/log"

	nfqueue "github.com/florianl/go-nfqueue/v2"
)

func OnPacket(queue *nfqueue.Nfqueue, attribute nfqueue.Attribute) int {
	if attribute.PacketID != nil {
		if attribute.Payload != nil {
			log.Info("We got a packet with payload:", *attribute.Payload)
		}
		// this will accept the packet, use NfDrop to
		// drop the packet instead.
		queue.SetVerdict(*attribute.PacketID, nfqueue.NfAccept)
	}
	return 0
}
```

A more complex example using the `gopacket` library to parse and dump all the layers of the packet:

```go
// test.go
package main

import (
	"github.com/bettercap/bettercap/v2/log"

	nfqueue "github.com/florianl/go-nfqueue/v2"
	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
)

func OnPacket(queue *nfqueue.Nfqueue, attribute nfqueue.Attribute) int {
	if attribute.PacketID != nil {
		id := *attribute.PacketID
		packet := gopacket.NewPacket(*attribute.Payload, layers.LayerTypeIPv4, gopacket.Default)
		log.Info(packet.Dump())
		queue.SetVerdict(id, nfqueue.NfAccept)
	}
	return 0
}
```

This `test.go` file can be compiled like so:

```bash
go build -buildmode=plugin test.go
```

Once the `test.so` file is generated, it can be used for the `packet.proxy.plugin` parameter.

:::note
Copy plugin `.go` files inside bettercap's source folder.
Compile from there to avoid vendor folder conflicts.
:::
