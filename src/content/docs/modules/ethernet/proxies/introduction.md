---
title: Introduction
description: A set of modules you can use to intercept traffic at the packet, TCP or HTTP/HTTPS level while performing a MITM attack.
sidebar:
  order: 1
---

A set of modules for intercepting traffic during a [MITM attack](/modules/ethernet/spoofers/introduction/).
Supports **packet**, **TCP**, and **HTTP/HTTPS** level interception.

Each proxy can be extended in two ways:
- **Go plugins**: For high-performance needs
- **JavaScript plugins**: Using the [Otto builtin engine](https://github.com/robertkrimen/otto)
