---
title: "Installation"
date: 2019-02-25T10:57:57+01:00
draft: false
weight: 3
---

**bettercap supports GNU/Linux, BSD, Android, Apple macOS and the Microsoft Windows** operating systems - depending if you want to install the latest stable release or the bleeding edge from the [GitHub repository](https://github.com/bettercap/bettercap), you have several choices.

## Precompiled Binaries

For every new release, we distribute bettercap's [precompiled binaries](https://github.com/bettercap/bettercap/releases). In order to be able to use them, you'll need the following dependencies on your system:

* libpcap
* libusb-1.0 (required by the [HID module](/modules/hid/))
* libnetfilter-queue (on Linux only, required by the [packet.proxy module](/modules/ethernet/proxies/packet.proxy/))

## Using Docker

BetterCAP is containerized using [Alpine Linux](https://alpinelinux.org/) -  a security-oriented, lightweight Linux distribution based on musl libc and busybox. The resulting Docker image is relatively small and easy to manage the dependencies. Since it is using a multi-stage build, **a Docker version greater than 17.05 is required**.

To pull latest stable version of the image:

    docker pull bettercap/bettercap

To pull latest source code build of the image:

    docker pull bettercap/dev

To run:

    docker run -it --privileged --net=host bettercap/bettercap -h

## Compiling from Sources

In order to compile bettercap from sources, make sure that:

* You have a correctly configured **[Go >= 1.8](https://golang.org/doc/install)** environment.
* `$GOPATH` is defined and `$GOPATH/bin` is in `$PATH`.

You'll also need to install the dependencies:

* build-essential
* libpcap-dev
* libusb-1.0-dev (required by the [HID module](/modules/hid/))
* libnetfilter-queue-dev (on Linux only, required by the [packet.proxy module](/modules/ethernet/proxies/packet.proxy/))

Once you've met this conditions, you can run the following commands to compile and install bettercap in `/usr/local/bin/bettercap`:

    go get github.com/bettercap/bettercap
    cd $GOPATH/src/github.com/bettercap/bettercap
    make build 
    sudo make install

## Compiling on Android

Install [Termux](https://termux.com/).    
In Termux, type:
```
pkg install root-repo
pkg install golang git libpcap-dev libusb-dev
go get -u github.com/bettercap/bettercap
```
and wait.    
Your build is in go/bin/bettercap.




