---
title: "ticker"
date: 2019-02-25T11:57:21+01:00
draft: false
weight: 2
---

The ticker module can be used to execute a given set of commands periodically in the interactive session. 

### Commands

#### `ticker on`

Start the ticker. |

#### `ticker off` 

Stop the ticker.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `ticker.commands` | `clear; net.show` | List of commands separated by a `;`. | 
| `ticker.period` | `1` | Ticker period in seconds. |

{{% notice example %}}
Start probing for hosts, clear the screen and plot discovered endpoints every second (will use default parameters):
<br/>
`> net.probe on; clear; ticker on`
{{% /notice %}}

{{% notice example %}}
Keep deauthenticating clients from the access point with BSSID `DE:AD:BE:EF:DE:AD` every five seconds:
<br/>
`> set ticker.period 5; set ticker.commands "wifi.deauth DE:AD:BE:EF:DE:AD"; ticker on`
{{% /notice %}}
