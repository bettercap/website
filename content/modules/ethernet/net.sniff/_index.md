---
title: "net.sniff - net.fuzz"
date: 2019-02-25T12:52:30+01:00
draft: false
weight: 3
---

This module is a network packet sniffer and fuzzer supporting both [BPF syntax](http://biot.com/capstats/bpf.html) and regular expressions for filtering. 
It is also able to dissect several major protocols in order to harvest credentials.

### Commands

#### `net.sniff on`

Start the packet sniffer.
#### `net.sniff off`

Stop the packet sniffer.
#### `net.sniff stats`

Print the packet sniffer session configuration and statistics.
#### `net.fuzz on`

Enable fuzzing for every sniffed packet containing the specified layers.
#### `net.fuzz off`

Disable fuzzing.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `net.sniff.output` |  | If set, the sniffer will write captured packets to this pcap file. |
| `net.sniff.source` | | If set, the sniffer will read from this pcap file instead of the current interface. |
| `net.sniff.verbose` | `false` | If true, every captured and parsed packet will be sent to the events.stream for displaying, otherwise only the ones parsed at the application layer (sni, http, etc). |
| `net.sniff.local` | `false` | If true it will consider packets from/to this computer, otherwise it will skip them. |
| `net.sniff.filter` | `not arp` | BPF filter for the sniffer. |
| `net.sniff.regexp` | | If set, only packets with a payload matching this regular expression will be considered. |
| `net.fuzz.layers` | `Payload` | Comma separated [types of layer](https://github.com/google/gopacket/blob/master/layers/layertypes.go#L13) to fuzz. |
| `net.fuzz.rate` | `1.0` | Rate in the [0.0,1.0] interval of packets to fuzz. |
| `net.fuzz.ratio` | `0.4` | Rate in the [0.0,1.0] interval of bytes to fuzz for each packet. |
| `net.fuzz.silent` | `false` | If true it will not report fuzzed packets. |

### Examples

The [local-sniffer.cap](https://github.com/bettercap/caplets/blob/master/local-sniffer.cap) caplet will sniff, parse and print all packets on the local machine:

```sh
events.clear

set net.sniff.verbose false
set net.sniff.local true
# uncomment to skip ARP and DNS requests
# set net.sniff.filter "not arp and not udp port 53"
net.sniff on
```

Change 90% of mDNS incoming packets by fuzzing 40% of their payload (will reinject fuzzed packets):

```sh
set net.sniff.verbose true
set net.fuzz.rate 0.9
set net.fuzz.ratio 0.4
set net.fuzz.silent false
set net.fuzz.layers Payload
set net.sniff.filter "host 224.0.0.251 and port 5353"
net.fuzz on
```

Change 100% of WiFi packets by fuzzing 70% of their `Dot11InformationElement` and `Dot11Data` layers:

```sh
set net.sniff.verbose true
set net.fuzz.rate 1.0
set net.fuzz.ratio 0.7
set net.fuzz.layers Dot11InformationElement, Dot11Data
net.fuzz on
```
