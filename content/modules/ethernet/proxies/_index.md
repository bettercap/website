---
title: "Proxies"
date: 2019-02-25T13:03:38+01:00
draft: false
weight: 7
---

A set of modules you can use to intercept traffic at the packet, TCP or HTTP/HTTPS level while performing a [MITM attack](/modules/ethernet/spoofers/). 
Each proxy can be either extended with the Go plugin system (when keeping high performances is important), or scripted with Javascript plugins thanks to the [Otto builtin engine](https://github.com/robertkrimen/otto):

{{% children depth="999" %}}
