---
title: "api.rest"
date: 2019-02-25T12:40:01+01:00
draft: false
weight: 5
---

A RESTful API server to orchestrate and interact with the current interactive session, starts on HTTP and unauthenticated by default, can be switched to HTTPS and basic auth by using the proper parameters.

### Commands

#### `api.rest on`

Start the REST API server.

#### `api.rest off` 

Stop the REST API server.

#### `api.rest.record FILENAME` 

Start polling the rest API periodically recording each sample in a compressed file that can be later replayed.

#### `api.rest.record off` 

Stop recording the session.

#### `api.rest.replay FILENAME`

Start the rest API module in replay mode using `FILENAME` as the recorded session file, will revert to normal mode once the replay is over.

#### `api.rest.replay off`

Stop replaying the recorded session.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `api.rest.certificate` |  | API TLS certificate (will be auto generated if not existing), fill to enable HTTPS. | 
| `api.rest.key` | | API TLS key (will be auto generated if not existing), fill to enable HTTPS. | 
| `api.rest.certificate.bits` | `4096` | Number of bits of the RSA private key of the generated HTTPS certificate. |
| `api.rest.certificate.commonname` | `bettercap` | Common Name field of the generated HTTPS certificate. |
| `api.rest.certificate.country` | `US` | Country field of the generated HTTPS certificate. |
| `api.rest.certificate.locality` | | Locality field of the generated HTTPS certificate. |
| `api.rest.certificate.organization` | `bettercap devteam` | Organization field of the generated HTTPS certificate. |
| `api.rest.certificate.organizationalunit` | `https://bettercap.org/` | Organizational Unit field of the generated HTTPS certificate. |
| `api.rest.address` | `127.0.0.1` | Address to bind the API REST server to. | 
| `api.rest.port` | `8081` | Port to bind the API REST server to. | 
| `api.rest.username` | | API HTTP basic auth username. | 
| `api.rest.password` | | API HTTP basic auth password. | 
| `api.rest.websocket` | `false` | If true the `/api/events` route will be available as a websocket endpoint instead of HTTP. |
| `api.rest.alloworigin` | `*` | Value of the Access-Control-Allow-Origin header of the API server. |
| `api.rest.record.clock` | `1` | Number of seconds to wait while recording with api.rest.record between one sample and the next one. |

### Routes

Clients can authenticate using HTTP basic authentication, these are the available API routes.

#### `GET /api/session`

Get a JSON of the state of the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
	"options": {
		"InterfaceName": "",
		"Caplet": "../caplets/netmon.cap",
		"Debug": false,
		"Silent": false,
		"NoHistory": false,
		"Commands": "",
		"CpuProfile": "",
		"MemProfile": ""
	},
	"interface": {
		"ipv4": "192.168.1.17",
		"ipv6": "-",
		"mac": "-",
		"hostname": "enx18fffffff",
		"alias": "",
		"vendor": "Dell",
		"first_seen": "2018-02-23T06:28:43.565053179+01:00",
		"last_seen": "2018-02-23T06:28:43.565053179+01:00",
		"meta": {
			"values": {}
		}
	},
	"gateway": {
		"ipv4": "192.168.1.1",
		"ipv6": "",
		"mac": "-",
		"hostname": "gateway.",
		"alias": "",
		"vendor": "Technicolor",
		"first_seen": "2018-02-23T06:28:43.649440315+01:00",
		"last_seen": "2018-02-23T06:28:43.649440315+01:00",
		"meta": {
			"values": {}
		}
	},
	"env": {
		"data": {
			"$": "{by}{fw}{cidr} {fb}\u003e {env.iface.ipv4} {reset} {bold}» {reset}",
			"api.rest.address": "\u003cinterface address\u003e",
			"api.rest.certificate": "~/.bcap-api.rest.certificate.pem",
			"api.rest.key": "~/.bcap-api.rest.key.pem",
			"api.rest.password": "bcap",
			"api.rest.port": "8083",
			"api.rest.username": "bcap",
			"arp.spoof.targets": "\u003centire subnet\u003e",
			"dhcp6.spoof.domains": "microsoft.com, goole.com, facebook.com, apple.com, twitter.com",
			"dns.spoof.address": "\u003cinterface address\u003e",
			"dns.spoof.all": "false",
			"dns.spoof.domains": "*",
			"events.stream.filter": "",
			"gateway.address": "192.168.1.1",
			"gateway.mac": "e0:b9:e5:17:22:e4",
			"http.port": "80",
			"http.proxy.address": "\u003cinterface address\u003e",
			"http.proxy.port": "8080",
			"http.proxy.script": "",
			"http.server.address": "\u003cinterface address\u003e",
			"http.server.path": ".",
			"http.server.port": "80",
			"https.port": "443",
			"https.proxy.address": "\u003cinterface address\u003e",
			"https.proxy.certificate": "~/.bettercap-ca.cert.pem",
			"https.proxy.key": "~/.bettercap-ca.key.pem",
			"https.proxy.port": "8083",
			"https.proxy.script": "",
			"iface.index": "6",
			"iface.ipv4": "192.168.1.17",
			"iface.ipv6": "-",
			"iface.mac": "-",
			"iface.name": "enx18fffffff",
			"log.debug": "false",
			"log.silent": "false",
			"mac.changer.address": "\u003crandom mac\u003e",
			"mac.changer.iface": "\u003cinterface name\u003e",
			"net.probe.throttle": "10",
			"net.sniff.filter": "not arp",
			"net.sniff.local": "false",
			"net.sniff.output": "",
			"net.sniff.regexp": "",
			"net.sniff.source": "",
			"net.sniff.verbose": "true",
			"ticker.commands": "clear; net.show",
			"ticker.period": "1",
			"wifi.recon.channel": ""
		}
	},
	"lan": {
		"hosts": [{
			"ipv4": "192.168.1.33",
			"ipv6": "",
			"mac": "-",
			"hostname": "",
			"alias": "nas",
			"vendor": "Noon Technology Co.",
			"first_seen": "2018-02-23T06:28:43.661773691+01:00",
			"last_seen": "2018-02-23T06:29:10.402653849+01:00",
			"meta": {
				"values": {}
			}
		}, {
			"ipv4": "192.168.1.29",
			"ipv6": "",
			"mac": "-",
			"hostname": "osxvm",
			"alias": "",
			"vendor": "PCS Systemtechnik GmbH",
			"first_seen": "2018-02-23T06:28:43.661807871+01:00",
			"last_seen": "2018-02-23T06:28:43.661807871+01:00",
			"meta": {
				"values": {}
			}
		}, {
			"ipv4": "192.168.1.22",
			"ipv6": "",
			"mac": "-",
			"hostname": "yamato",
			"alias": "",
			"vendor": "Apple",
			"first_seen": "2018-02-23T06:28:43.661869827+01:00",
			"last_seen": "2018-02-23T06:29:13.734671382+01:00",
			"meta": {
				"values": {}
			}
		}, {
			"ipv4": "192.168.1.254",
			"ipv6": "",
			"mac": "-",
			"hostname": "",
			"alias": "gateway",
			"vendor": "",
			"first_seen": "2018-02-23T06:28:43.6617926+01:00",
			"last_seen": "2018-02-23T06:28:43.6617926+01:00",
			"meta": {
				"values": {}
			}
		}, {
			"ipv4": "192.168.1.26",
			"ipv6": "",
			"mac": "-",
			"hostname": "winvm",
			"alias": "",
			"vendor": "PCS Systemtechnik GmbH",
			"first_seen": "2018-02-23T06:28:43.661830083+01:00",
			"last_seen": "2018-02-23T06:28:43.661830083+01:00",
			"meta": {
				"values": {}
			}
		}, {
			"ipv4": "192.168.1.76",
			"ipv6": "",
			"mac": "-",
			"hostname": "pibak",
			"alias": "",
			"vendor": "Raspberry Pi Foundation",
			"first_seen": "2018-02-23T06:28:43.661833177+01:00",
			"last_seen": "2018-02-23T06:29:07.391079854+01:00",
			"meta": {
				"values": {}
			}
		}, {
			"ipv4": "192.168.1.3",
			"ipv6": "",
			"mac": "00:17:88:29:97:bc",
			"hostname": "",
			"alias": "lights",
			"vendor": "Philips Lighting BV",
			"first_seen": "2018-02-23T06:28:43.661849075+01:00",
			"last_seen": "2018-02-23T06:29:14.306812147+01:00",
			"meta": {
				"values": {}
			}
		}, {
			"ipv4": "192.168.1.23",
			"ipv6": "",
			"mac": "-",
			"hostname": "pihole",
			"alias": "",
			"vendor": "Raspberry Pi Foundation",
			"first_seen": "2018-02-23T06:28:43.661854928+01:00",
			"last_seen": "2018-02-23T06:29:14.786637323+01:00",
			"meta": {
				"values": {}
			}
		}]
	},
	"wifi": {
		"aps": []
	},
	"packets": {
		"Stats": {
			"Sent": 1080,
			"Received": 213207,
			"PktReceived": 3549,
			"Errors": 0
		},
		"Protos": {
			"ARP": 2918,
			"DNS": 32,
			"Ethernet": 3549,
			"ICMPv4": 44,
			"IPv4": 631,
			"TCP": 394,
			"UDP": 193
		},
		"Traffic": {
			"192.168.1.0": {
				"Sent": 0,
				"Received": 215
			},
			"192.168.1.1": {
				"Sent": 0,
				"Received": 289
			},
			"192.168.1.13": {
				"Sent": 415,
				"Received": 289
			},
			"192.168.1.14": {
				"Sent": 0,
				"Received": 289
			},
			"192.168.1.17": {
				"Sent": 41356,
				"Received": 46456
			},
			"192.168.1.20": {
				"Sent": 2658,
				"Received": 2018
			},
			"192.168.1.22": {
				"Sent": 1426,
				"Received": 215
			},
			"192.168.1.23": {
				"Sent": 2220,
				"Received": 1747
			},
			"192.168.1.254": {
				"Sent": 120,
				"Received": 320
			},
			"192.168.1.255": {
				"Sent": 0,
				"Received": 1140
			},
			"192.168.1.26": {
				"Sent": 0,
				"Received": 215
			},
			"192.168.1.29": {
				"Sent": 0,
				"Received": 215
			},
			"192.168.1.3": {
				"Sent": 1438,
				"Received": 654
			},
			"192.168.1.33": {
				"Sent": 130,
				"Received": 355
			},
			"192.168.1.34": {
				"Sent": 2303,
				"Received": 2018
			},
			"192.168.1.43": {
				"Sent": 10756,
				"Received": 8721
			},
			"192.168.1.6": {
				"Sent": 497,
				"Received": 375
			},
			"192.168.1.76": {
				"Sent": 284,
				"Received": 172
			},
			"192.168.1.78": {
				"Sent": 284,
				"Received": 172
			}
		}
	},
	"started_at": "2018-02-23T06:28:43.650628576+01:00",
	"active": true
}
```{{% /expand %}}

#### `GET /api/session/lan`

Get a JSON of the lan devices in the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "hosts": [{
        "ipv4": "192.168.1.33",
        "ipv6": "",
        "mac": "-",
        "hostname": "",
        "alias": "nas",
        "vendor": "Noon Technology Co.",
        "first_seen": "2018-02-23T06:28:43.661773691+01:00",
        "last_seen": "2018-02-23T06:29:10.402653849+01:00",
        "meta": {
            "values": {}
        }
    }, {
        "ipv4": "192.168.1.29",
        "ipv6": "",
        "mac": "-",
        "hostname": "osxvm",
        "alias": "",
        "vendor": "PCS Systemtechnik GmbH",
        "first_seen": "2018-02-23T06:28:43.661807871+01:00",
        "last_seen": "2018-02-23T06:28:43.661807871+01:00",
        "meta": {
            "values": {}
        }
    }, {
        "ipv4": "192.168.1.23",
        "ipv6": "",
        "mac": "00:AA:BB:CC:DD:11",
        "hostname": "pihole",
        "alias": "",
        "vendor": "Raspberry Pi Foundation",
        "first_seen": "2018-02-23T06:28:43.661854928+01:00",
        "last_seen": "2018-02-23T06:29:14.786637323+01:00",
        "meta": {
            "values": {}
        }
    }]
}
```{{% /expand %}}

##### Optional Arguments

- Mac address, eg. `GET /api/session/lan/00:AA:BB:CC:DD:11` - return information of a single lan endpoint with the mac address of 00:AA:BB:CC:DD:11 (the pihole from the above output).

#### `GET /api/session/wifi`

Get a JSON of the wifi devices (clients and access points) in the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "aps": [{
            "alias": "",
            "authentication": "PSK",
            "cipher": "TKIP",
            "clients": [],
            "encryption": "WPA2",
            "first_seen": "2018-02-23T06:28:43.650628576+01:00",
            "frequency": 2412,
            "hostname": "AP1",
            "ipv4": "0.0.0.0",
            "ipv6": "",
            "last_seen": "2018-02-23T06:28:43.650628576+01:00",
            "mac": "-",
            "meta": {
                "values": {}
            },
            "received": 0,
            "rssi": -20,
            "sent": 0,
            "vendor": ""
        },
        {
            "alias": "",
            "authentication": "PSK",
            "cipher": "TKIP",
            "clients": [],
            "encryption": "WPA2",
            "first_seen": "2018-02-23T06:28:43.650628576+01:00",
            "frequency": 2412,
            "hostname": "<hidden>",
            "ipv4": "0.0.0.0",
            "ipv6": "",
            "last_seen": "2018-02-23T06:28:43.650628576+01:00",
            "mac": "-",
            "meta": {
                "values": {}
            },
            "received": 0,
            "rssi": -16,
            "sent": 0,
            "vendor": ""
        },
        {
            "alias": "",
            "authentication": "PSK",
            "cipher": "TKIP",
            "clients": [],
            "encryption": "WPA2",
            "first_seen": "2018-02-23T06:28:43.650628576+01:00",
            "frequency": 2412,
            "hostname": "<hidden>",
            "ipv4": "0.0.0.0",
            "ipv6": "",
            "last_seen": "2018-02-23T06:28:43.650628576+01:00",
            "mac": "-",
            "meta": {
                "values": {}
            },
            "received": 0,
            "rssi": -21,
            "sent": 0,
            "vendor": ""
        },
        {
            "alias": "",
            "authentication": "PSK",
            "cipher": "CCMP",
            "clients": [{
                "alias": "",
                "authentication": "",
                "cipher": "",
                "encryption": "",
                "first_seen": "2018-02-23T06:28:43.650628576+01:00",
                "frequency": 2427,
                "hostname": "",
                "ipv4": "0.0.0.0",
                "ipv6": "",
                "last_seen": "2018-02-23T06:28:43.650628576+01:00",
                "mac": "00:AA:BB:CC:DD:22",
                "meta": {
                    "values": {}
                },
                "received": 0,
                "rssi": -31,
                "sent": 0,
                "vendor": ""
            }],
            "encryption": "WPA2",
            "first_seen": "2018-02-23T06:28:43.650628576+01:00",
            "frequency": 2427,
            "hostname": "AP2",
            "ipv4": "0.0.0.0",
            "ipv6": "",
            "last_seen": "2018-02-23T06:28:43.650628576+01:00",
            "mac": "-",
            "meta": {
                "values": {}
            },
            "received": 3100,
            "rssi": -31,
            "sent": 1040,
            "vendor": ""
        },
    ]
}
```{{% /expand %}}

##### Optional Arguments

- Mac address, eg. `GET /api/session/wifi/00:AA:BB:CC:DD:22` - return information of a single wifi endpoint with the mac address of 00:AA:BB:CC:DD:22 (the connected client from the above output).

#### `GET /api/session/ble`

Get a JSON of the BLE devices in the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "devices": [{
        "last_seen": "2018-02-23T06:28:43.650628576+01:00",
        "name": "Adafruit Bluefruit LE",
        "mac": "00:AA:BB:CC:DD:33",
        "vendor": "",
        "rssi": -68
    }, {
        "last_seen": "2018-02-23T06:28:43.650628576+01:00",
        "name": "",
        "mac": "-",
        "vendor": "",
        "rssi": -64
    }]
}
```{{% /expand %}}

##### Optional Arguments

- Mac address, eg. `GET /api/session/ble/00:AA:BB:CC:DD:33` - return information of a single ble endpoint with the mac address of 00:AA:BB:CC:DD:33 (the Adafruit Bluefruit LE client from the above output).

#### `GET /api/session/hid`

Get a JSON of the HID devices in the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
	"devices": [{
		"last_seen": "2019-03-09T11:41:45.642403461+01:00",
		"type": "Logitech",
		"address": "32:26:9f:a4:08",
		"channels": ["65"]
	}]
}
```{{% /expand %}}

##### Optional Arguments

- Hardware address, eg. `GET /api/session/hid/32:26:9f:a4:08` - return information of a single HID endpoint with the hardware address of `32:26:9f:a4:08`.

#### `GET /api/session/env`

Get a JSON of the environment variables in the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "data": {
        "$": "{by}{fw}{cidr} {fb}\u003e {env.iface.ipv4} {reset} {bold}» {reset}",
        "api.rest.address": "\u003cinterface address\u003e",
        "api.rest.certificate": "~/.bcap-api.rest.certificate.pem",
        "api.rest.key": "~/.bcap-api.rest.key.pem",
        "api.rest.password": "bcap",
        "api.rest.port": "8083",
        "api.rest.username": "bcap",
        "arp.spoof.targets": "\u003centire subnet\u003e",
        "dhcp6.spoof.domains": "microsoft.com, goole.com, facebook.com, apple.com, twitter.com",
        "dns.spoof.address": "\u003cinterface address\u003e",
        "dns.spoof.all": "false",
        "dns.spoof.domains": "*",
        "events.stream.filter": "",
        "gateway.address": "192.168.1.1",
        "gateway.mac": "e0:b9:e5:17:22:e4",
        "http.port": "80",
        "http.proxy.address": "\u003cinterface address\u003e",
        "http.proxy.port": "8080",
        "http.proxy.script": "",
        "http.server.address": "\u003cinterface address\u003e",
        "http.server.path": ".",
        "http.server.port": "80",
        "https.port": "443",
        "https.proxy.address": "\u003cinterface address\u003e",
        "https.proxy.certificate": "~/.bettercap-ca.cert.pem",
        "https.proxy.key": "~/.bettercap-ca.key.pem",
        "https.proxy.port": "8083",
        "https.proxy.script": "",
        "iface.index": "6",
        "iface.ipv4": "192.168.1.17",
        "iface.ipv6": "-",
        "iface.mac": "-",
        "iface.name": "enx18fffffff",
        "log.debug": "false",
        "log.silent": "false",
        "mac.changer.address": "\u003crandom mac\u003e",
        "mac.changer.iface": "\u003cinterface name\u003e",
        "net.probe.throttle": "10",
        "net.sniff.filter": "not arp",
        "net.sniff.local": "false",
        "net.sniff.output": "",
        "net.sniff.regexp": "",
        "net.sniff.source": "",
        "net.sniff.verbose": "true",
        "ticker.commands": "clear; net.show",
        "ticker.period": "1",
        "wifi.recon.channel": ""
    }
}
```{{% /expand %}}

#### `GET /api/session/gateway`

Get a JSON of the interface gateway of the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "ipv4": "192.168.1.1",
    "ipv6": "",
    "mac": "-",
    "hostname": "gateway.",
    "alias": "",
    "vendor": "Technicolor",
    "first_seen": "2018-02-23T06:28:43.649440315+01:00",
    "last_seen": "2018-02-23T06:28:43.649440315+01:00",
    "meta": {
        "values": {}
    }
}
```{{% /expand %}}

#### `GET /api/session/interface`

Get a JSON of the main interface (wifi/lan) of the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "ipv4": "192.168.1.17",
    "ipv6": "-",
    "mac": "-",
    "hostname": "enx18fffffff",
    "alias": "",
    "vendor": "Dell",
    "first_seen": "2018-02-23T06:28:43.565053179+01:00",
    "last_seen": "2018-02-23T06:28:43.565053179+01:00",
    "meta": {
        "values": {}
    }
}
```{{% /expand %}}

#### `GET /api/session/options`

Get a JSON of the options set for the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "InterfaceName": "",
    "Caplet": "../caplets/netmon.cap",
    "Debug": false,
    "Silent": false,
    "NoHistory": false,
    "Commands": "",
    "CpuProfile": "",
    "MemProfile": ""
}
```{{% /expand %}}

#### `GET /api/session/packets`

Get a JSON of the packet traffic for the current session, example response:

{{% expand "Expand for the example JSON" %}}```json
{
    "Stats": {
        "Sent": 1080,
        "Received": 213207,
        "PktReceived": 3549,
        "Errors": 0
    },
    "Protos": {
        "ARP": 2918,
        "DNS": 32,
        "Ethernet": 3549,
        "ICMPv4": 44,
        "IPv4": 631,
        "TCP": 394,
        "UDP": 193
    },
    "Traffic": {
        "192.168.1.0": {
            "Sent": 0,
            "Received": 215
        },
        "192.168.1.1": {
            "Sent": 0,
            "Received": 289
        },
        "192.168.1.34": {
            "Sent": 2303,
            "Received": 2018
        },
        "192.168.1.76": {
            "Sent": 284,
            "Received": 172
        },
        "192.168.1.78": {
            "Sent": 284,
            "Received": 172
        }
    }
}
```{{% /expand %}}

#### `GET /api/session/started-at`

Get a JSON of the time the current session was started, example response:

{{% expand "Expand for the example JSON" %}}```json
"2018-02-23T06:28:43.650628576+01:00"
```{{% /expand %}}

#### `POST /api/session`

Post a command to the interactive session, the JSON object being POSTed is expected to be:

{{% expand "Expand for the example JSON" %}}```json
{"cmd": "net.probe on"}
```{{% /expand %}}

While the response will be:

{{% expand "Expand for the example JSON" %}}```json
{"success": true, "msg":""}
```{{% /expand %}}

#### `GET /api/events`

{{% notice note %}}
This route will be available as a websocket endpoint instead of normal HTTP if the `api.rest.websocket` parameter is set to true.
{{% /notice %}}

Return a list of events ( the optional `n` GET parameter will limit the number ):

{{% expand "Expand for the example JSON" %}}```json
[{
	"tag": "sys.log",
	"time": "2018-02-22T16:57:39.449618552+01:00",
	"data": {
		"Level": 1,
		"Message": "Ticker running with period 1s."
	}
}, {
	"tag": "wifi.ap.new",
	"time": "2018-02-22T16:57:57.681938014+01:00",
	"data": {
		"ipv4": "0.0.0.0",
		"ipv6": "",
		"mac": "--",
		"hostname": "Some AP Name Here",
		"alias": "",
		"vendor": "",
		"first_seen": "2018-02-22T16:57:57.681877278+01:00",
		"last_seen": "2018-02-22T16:57:58.104218287+01:00",
		"frequency": 2427,
		"rssi": -56,
		"sent": 0,
		"received": 0,
		"encryption": "OPEN",
		"clients": []
	}
}]
```{{% /expand %}}

#### `DELETE /api/events`

Will clear the events buffer.
