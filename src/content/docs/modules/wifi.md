---
title: WiFi
description: The WiFi modules use a WiFi interface supporting monitor mode and packet injection in order to scan the 802.11 spectrum, perform deauthentication attacks on connected client stations, perform RSN PMKID based clientless attacks on vulnerable access points, automatically sniff and save key material either from complete WPA/WPA2 handshakes or PMKID packets, send spoofed management beacons to create fake access points or fake client probes and perform authentication wordlist attacks
sidebar:
  order: 3
---

The WiFi modules use a WiFi interface supporting monitor mode and packet injection in order to:

- scan the [802.11 spectrum](https://en.wikipedia.org/wiki/IEEE_802.11)
- perform deauthentication attacks on connected client stations
- perform [RSN PMKID based](https://www.evilsocket.net/2019/02/13/Pwning-WiFi-networks-with-bettercap-and-the-PMKID-client-less-attack/) clientless attacks on vulnerable access points
- _automatically sniff and save key material_ either from complete WPA/WPA2 handshakes or PMKID packets.
- send spoofed management beacons to create fake access points or fake client probes.
- perform authentication wordlist attacks.

:::note
The interface only needs to support monitor mode and packet injection, it'll be bettercap itself to switch it to the right mode, just make sure there aren't other processes using the same wifi interface.

:::

:::note
This modules are natively supported on macOS with the default interface `en0`. Just make sure the interface is not connected to any WiFi network and then start bettercap with:

```bash
sudo bettercap -iface en0
```

:::

## Commands

### `wifi.recon on`

Start 802.11 wireless base stations discovery and handshakes/PMKID capture.

### `wifi.recon off`

Stop 802.11 wireless base stations discovery.

### `wifi.bruteforce on`

Attempts to bruteforce WiFi authentication (see **bruteforce** specific parameters).

### `wifi.bruteforce off`

Stop previously started bruteforcing.

### `wifi.clear`

Clear all access points collected by the WiFi discovery module.

### `wifi.recon BSSID`

Set 802.11 base station address to filter for.

### `wifi.recon clear`

Remove the 802.11 base station filter.

### `wifi.assoc BSSID`

Send an association request to the selected BSSID in order to [receive a RSN PMKID](https://hashcat.net/forum/thread-7717.html) key (use `all`, `*` or `ff:ff:ff:ff:ff:ff` to iterate for every access point).

### `wifi.deauth BSSID`

Start a 802.11 deauth attack, if an access point BSSID is provided, every client will be deauthenticated, otherwise only the selected client (**use `all`, `*` or `ff:ff:ff:ff:ff:ff` to deauth everything**).

### `wifi.probe BSSID ESSID`

Send a fake client probe with the given station BSSID, searching for ESSID.

### `wifi.show`

Show current wireless stations list (default sorting by RSSI).

### `wifi.show.wps BSSID`

Show WPS information about a given station (use `all`, `*` or `ff:ff:ff:ff:ff:ff` to select all).

### `wifi.recon.channel CHANNEL`

Comma separated list of channels to hop on.

### `wifi.recon.channel clear`

Enable channel hopping on all supported channels.

### `wifi.ap`

Inject fake management beacons in order to create a rogue access point ( requires `wifi.recon` to run ).

### `wifi.client.probe.ap.filter FILTER`

Use this regular expression on the access point name to filter client probes, `clear` to reset the filter.

### `wifi.client.probe.sta.filter FILTER`

Use this regular expression on the station address to filter client probes, `clear` to reset the filter.

### `wifi.channel_switch_announce BSSID CHANNEL`

Start a 802.11 channel hop attack, all client will be forced to change the channel lead to connection down.

## Parameters

| Parameter                             | Default                            | Description                                                                                                                                                                                     |
| ------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wifi.assoc.acquired`                 | `false`                            | Send association to AP's for which key material was already acquired.                                                                                                                           |
| `wifi.assoc.open`                     | `false`                            | Send association requests to open networks.                                                                                                                                                     |
| `wifi.assoc.skip`                     |                                    | Comma separated list of BSSID to skip while sending association requests.                                                                                                                       |
| `wifi.assoc.silent`                   | `false`                            | If true, messages from wifi.assoc will be suppressed.                                                                                                                                           |
| `wifi.ap.bssid`                       | `<random mac>`                     | BSSID of the fake access point.                                                                                                                                                                 |
| `wifi.ap.channel`                     | `1`                                | Channel of the fake access point.                                                                                                                                                               |
| `wifi.ap.encryption`                  | `true`                             | If true, the fake access point will use WPA2, otherwise it'll result as an open AP.                                                                                                             |
| `wifi.ap.ssid`                        | `FreeWifi`                         | SSID of the fake access point.                                                                                                                                                                  |
| `wifi.ap.ttl`                         | `300`                              | Seconds of inactivity for an access points to be considered not in range anymore.                                                                                                               |
| `wifi.channel_switch_announce.silent` | `false`                            | If true, messages from wifi.channel_switch_announce will be suppressed.                                                                                                                         |
| `wifi.deauth.acquired`                | `false`                            | Send wifi deauth packets from AP's for which key material was already acquired.                                                                                                                 |
| `wifi.deauth.open`                    | `true`                             | Send wifi deauth packets to open networks.                                                                                                                                                      |
| `wifi.deauth.skip`                    |                                    | Comma separated list of BSSID to skip while sending deauth packets.                                                                                                                             |
| `wifi.deauth.silent`                  | `false`                            | If true, messages from `wifi.deauth` will be suppressed.                                                                                                                                        |
| `wifi.fake_auth.silent`               | `false`                            | If true, messages from wifi.fake_auth will be suppressed.                                                                                                                                       |
| `wifi.handshakes.aggregate`           | `true`                             | If true, all handshakes will be saved inside a single file, otherwise a folder with per-network pcap files will be created.                                                                     |
| `wifi.handshakes.file`                | `~/bettercap-wifi-handshakes.pcap` | File path of the pcap file to save handshakes to.                                                                                                                                               |
| `wifi.hop.period`                     | `250`                              | If channel hopping is enabled (empty `wifi.recon.channel`), this is the time in millseconds the algorithm will hop on every channel (it'll be doubled if both 2.4 and 5.0 bands are available). |
| `wifi.interface`                      |                                    | If filled, the module will use this interface instead of the one provided by the `-iface` argument or detected automatically.                                                                   |
| `wifi.region`                         | `BO`                               | Set the WiFi region to this value before activating the interface.                                                                                                                              |
| `wifi.rssi.min`                       | `-200`                             | Minimum WiFi signal strength in dBm.                                                                                                                                                            |
| `wifi.show.filter`                    |                                    | Defines a regular expression filter for `wifi.show`.                                                                                                                                            |
| `wifi.show.limit`                     | `0`                                | If greater than zero, defines limit for `wifi.show`.                                                                                                                                            |
| `wifi.show.manufacturer`              | `false`                            | If true, wifi.show will also show the devices manufacturers.                                                                                                                                    |
| `wifi.show.sort`                      | `rssi asc`                         | Defines sorting field (`rssi`, `bssid`, `essid`, `channel`, `encryption`, `clients`, `seen`, `sent`, `rcvd`) and direction (`asc` or `desc`) for `wifi.show`.                                   |
| `wifi.skip-broken`                    | `true`                             | If true, dot11 packets with an invalid checksum will be skipped.                                                                                                                                |
| `wifi.source.file`                    |                                    | If set, the wifi module will read from this pcap file instead of the hardware interface.                                                                                                        |
| `wifi.sta.ttl`                        | `300`                              | Seconds of inactivity for a client station to be considered not in range or not connected to its access point anymore.                                                                          |
| `wifi.txpower`                        | `30`                               | Set WiFi transmission power to this value before activating the interface.                                                                                                                      |

### Bruteforce specific parameters

| Parameter                       | Default                 | Description                                                                                                                |
| ------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `wifi.bruteforce.stop_at_first` | `true`                  | Stop bruteforcing after the first successful attempt.                                                                      |
| `wifi.bruteforce.target`        |                         | One or more comma separated targets to bruteforce as ESSID or BSSID. Leave empty to bruteforce all visibile access points. |
| `wifi.bruteforce.timeout`       | `15`                    | Timeout in seconds for each association attempt.                                                                           |
| `wifi.bruteforce.wide`          | `false`                 | Attempt a password for each access point before moving to the next one.                                                    |
| `wifi.bruteforce.wordlist`      | `/usr/share/dict/words` | Wordlist file to use for bruteforcing.                                                                                     |
| `wifi.bruteforce.workers`       | `1`                     | How many parallel workers. WARNING: Some routers will ban multiple concurrent attempts.                                    |

## Examples

Run bettercap using `eth0` as the main interface but start the wifi module on `wlan0` instead:

```bash
sudo bettercap -iface eth0 -eval "set wifi.interface wlan0; wifi.recon on"
```

Keep deauthing clients from the access point with BSSID `DE:AD:BE:EF:DE:AD` every five seconds:

```bash
set ticker.period 5; set ticker.commands "wifi.deauth DE:AD:BE:EF:DE:AD"; ticker on
```

Use the [ticker](/modules/core/ticker/) and `wifi.recon` modules to create a WiFi scanner (performing channel hopping on every supported frequency):

```bash
set ticker.commands "clear; wifi.show"; wifi.recon on; ticker on
```

Sort by BSSID and filter for BSSIDs starting with `F4`:

```bash
set wifi.show.sort bssid asc
set wifi.show.filter ^F4
wifi.show
```

Only recon on channels 1, 2 and 3:

```bash
wifi.recon.channel 1,2,3; wifi.recon on
```

Will send management beacons as the fake access point "Banana" with BSSID `DE:AD:BE:EF:DE:AD` on channel 5 without encryption:

```bash
set wifi.ap.ssid Banana
set wifi.ap.bssid DE:AD:BE:EF:DE:AD
set wifi.ap.channel 5
set wifi.ap.encryption false
wifi.recon on; wifi.ap
```

Bruteforce using a wordlist:

```bash
set wifi.interface en0
set wifi.bruteforce.target TargetRouter
set wifi.bruteforce.wordlist /path/to/your/wordlist.txt
set wifi.bruteforce.stop_at_first true
wifi.bruteforce on
```
