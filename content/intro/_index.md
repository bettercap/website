---
title: "Introduction"
date: 2019-02-25T10:57:36+01:00
weight: 1
draft: false
---

bettercap is a powerful, easily extensible and portable framework written in Go which aims to offer to security researchers, red teamers and reverse engineers an **easy to use**, **all-in-one solution** with all the features they might possibly need for performing reconnaissance and attacking [WiFi](/modules/wifi/) networks, [Bluetooth Low Energy](/modules/ble/) devices, wireless [HID](/modules/hid/) devices and [IPv4/IPv6](/modules/ethernet) networks.

## Main Features

* **WiFi** networks scanning, [deauthentication attack](https://www.evilsocket.net/2018/07/28/Project-PITA-Writeup-build-a-mini-mass-deauther-using-bettercap-and-a-Raspberry-Pi-Zero-W/), [clientless PMKID association attack](https://www.evilsocket.net/2019/02/13/Pwning-WiFi-networks-with-bettercap-and-the-PMKID-client-less-attack/) and automatic WPA/WPA2 client handshakes capture.
* **Bluetooth Low Energy** devices scanning, characteristics enumeration, reading and writing.
* 2.4Ghz wireless devices scanning and **MouseJacking** attacks with over-the-air HID frames injection (with DuckyScript support).
* Passive and active IP network hosts probing and recon.
* **ARP, DNS, DHCPv6 and NDP spoofers** for MITM attacks on IPv4 and IPv6 based networks.
* **Proxies at packet level, TCP level and HTTP/HTTPS** application level fully scriptable with easy to implement **javascript plugins**.
* A powerful **network sniffer** for **credentials harvesting** which can also be used as a **network protocol fuzzer**.
* A very fast port scanner.
* A powerful [REST API](/modules/core/api.rest/) with support for asynchronous events notification on websocket to orchestrate your attacks easily.
* An easy to use [web user interface](/usage/#web-ui).
* [More!](/modules/)

<center>
<blockquote class="twitter-tweet" data-conversation="none" data-lang="it">
<p lang="en" dir="ltr">
<a href="https://twitter.com/evilsocket?ref_src=twsrc%5Etfw">@evilsocket</a> bettercap has done to the networking and wireless world what <a href="https://twitter.com/metasploit?ref_src=twsrc%5Etfw">@metasploit</a> did for the exploitation world. I can&#39;t recommend a better tool. Long live bettercap and long live go.</p>&mdash; Jack Zimmer (@Zimmer_Security) <a href="https://twitter.com/Zimmer_Security/status/1095712903993405442?ref_src=twsrc%5Etfw">13 febbraio 2019</a></blockquote>
</center>

## About the 1.x Legacy Version

While the first version (up to 1.6.2) of bettercap was implemented in Ruby and only offered basic MITM, sniffing and proxying capabilities, the 2.x is a complete reimplementation using the [Go programming language](https://golang.org/). 

This ground-up rewrite offered several advantages:

* bettercap can now be distributed as a **single binary** with very few dependencies, for basically **any OS and any architecture**.
* 1.x proxies, altough highly optimized and event based, **[used to bottleneck the entire network](https://en.wikipedia.org/wiki/Global_interpreter_lock)** when performing a MITM attack, while the new version adds almost no overhead.
* Due to such **performance and functional limitations**, most of the features that the 2.x version is offering were simply impossible to implement properly (read as: without killing the entire network ... or your computer).

For this reason, **any version prior to 2.x is considered deprecated** and any type of support has been dropped in favor of the new implementation. An archived copy of the legacy documentation is [available here](/legacy/), however **it is strongly suggested to upgrade**.

