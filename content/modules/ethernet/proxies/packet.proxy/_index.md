---
title: "packet.proxy"
date: 2019-02-25T13:15:51+01:00
draft: false
weight: 2
---

A module that relies on [NFQUEUEs](https://home.regit.org/netfilter-en/using-nfqueue-and-libnetfilter_queue/) in order to actively filter packets, using [Go native plugins](https://golang.org/pkg/plugin/) (plugins for this module can be found [in this repository](https://github.com/bettercap/packet.proxy-plugins)).

{{% notice warning %}}
This module is only supported on GNU/Linux.
{{% /notice %}}

### Commands

#### `packet.proxy on`

Start the NFQUEUE based packet proxy.

#### `packet.proxy off`

Stop the NFQUEUE based packet proxy.

### Parameters

| parameter                | default  | description                                                                                  |
| ------------------------ | -------- | -------------------------------------------------------------------------------------------- |
| `packet.proxy.queue.num` | `0`      | NFQUEUE number to create and bind to.                                                        |
| `packet.proxy.chain`     | `OUTPUT` | Chain name of the iptables rule.                                                             |
| `packet.proxy.rule`      |          | Any additional iptables rule to make the queue more selective (ex. `--destination 8.8.8.8`). |
| `packet.proxy.plugin`    |          | Go plugin file to load and call for every packet.                                            |

### Plugins

Instead of using Javascript extensions like the HTTP and HTTPS proxies, this module requires the plugins to be natively written in Go in order to avoid adding too much overhead for each incoming packet. The `packet.proxy.plugin` parameter is mandatory and needs to be filled with the path of a shared object [built as a Go plugin](https://golang.org/pkg/plugin/) and exporting an `OnPacket` callback like the following:

```go
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

    go build -buildmode=plugin test.go

Once the `test.so` file is generated, it can be used for the `packet.proxy.plugin` parameter.

{{% notice info %}}
In order to be compiled correctly, plugin `.go` files need to be copied inside bettercap's source folder and compiled from there, otherwise you might have issues compiling due to dependency conflicts with the vendor folder.
{{% /notice %}}
