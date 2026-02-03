---
title: Installation
description: bettercap supports GNU/Linux, BSD, Android, Apple macOS and the Microsoft Windows operating systems - depending if you want to install the latest stable release or the bleeding edge from the [GitHub repository](https://github.com/bettercap/bettercap), you have several choices.
sidebar:
  order: 3
---

**bettercap** supports **GNU/Linux**, **BSD**, **Android**, **Apple macOS**, and **Microsoft Windows**.

You can install the latest stable release or the bleeding edge from the [GitHub repository](https://github.com/bettercap/bettercap).

## Dependencies

You'll need these dependencies on your system:

- pkg-config
- libpcap
- libusb-1.0-0 (required by the [HID module](/modules/hid/))
- libnetfilter-queue (on Linux only, required by the [packet.proxy module](/modules/ethernet/proxies/packetproxy/))

## Using pre-built binaries

Pre-built binaries are available for each new [release](https://github.com/bettercap/bettercap/releases).
Currently available for:

- Darwin arm64
- Linux amd64
- Windows amd64

## Using Go

Provided you have [Go](https://go.dev) installed:

```bash
go install github.com/bettercap/bettercap/v2@latest
```

## Using Docker

:::note
Any module that does not work at the IP level and requires direct hardware access, for example `wifi.recon`, will not work while running on Docker.

:::

bettercap is containerized using [Alpine Linux](https://alpinelinux.org/).
Alpine is a security-oriented, lightweight Linux distribution based on musl libc and busybox.
The resulting Docker image is small and easy to manage.

**Requires Docker version > 17.05** (uses multi-stage build).

To pull latest version of the image:

```bash
docker pull bettercap/bettercap
```

To run:

```bash
docker run -it --privileged --net=host bettercap/bettercap -h
```

## Using Homebrew

Provided you have [Homebrew](https://brew.sh) installed:

```bash
brew install bettercap
```

## Compiling from sources

Before compiling, ensure:

- **[Go >= 1.8](https://golang.org/doc/install)** is correctly configured
- `$GOPATH` is defined and `$GOPATH/bin` is in `$PATH`
- For limited hardware (Raspberry Pi Zero), consider [increasing swap size](https://www.bitpi.co/2015/02/11/how-to-change-raspberry-pis-swapfile-size-on-rasbian/)

You'll also need to install the dependencies:

- build-essential
- libpcap-dev
- libusb-1.0-0-dev (required by the [HID module](/modules/hid/))
- libnetfilter-queue-dev (on Linux only, required by the [packet.proxy module](/modules/ethernet/proxies/packetproxy/))

Then compile and install to `/usr/local/bin/bettercap`:

```bash
go get github.com/bettercap/bettercap
cd $GOPATH/src/github.com/bettercap/bettercap
make build
sudo make install
```

### Compiling on Android

#### Termux Method

:::note
This procedure and bettercap itself require a rooted device.

:::

Install [Termux](https://termux.com/) and from its prompt type:

```bash
pkg install root-repo
pkg install golang git libpcap libusb
```

There's a [golang bug](https://github.com/bettercap/bettercap/issues/486) in Termux about hardcoded paths.
Apply this workaround:

```bash
sudo su
mount -o rw,remount /
mkdir -p /home/builder/.termux-build/_cache/18-arm-21-v2/bin/
ln -s `which pkg-config` /home/builder/.termux-build/_cache/18-arm-21-v2/bin/arm-linux-androideabi-pkg-config
```

#### Linux Deploy Method Debian based (like Ubuntu)

Install [Linux Deploy](https://play.google.com/store/apps/details?id=ru.meefik.linuxdeploy) and [JuiceSSH](https://play.google.com/store/apps/details?id=com.sonelli.juicessh).
In Linux Deploy, install kalilinux_arm (requires [piggy helper](https://www.google.cl/search?q=piggy+helper+apk)).
Enable SSH, then type:

```bash
sudo apt update
sudo apt install golang git build-essential libpcap-dev libusb-1.0-0-dev libnetfilter-queue-dev
```

You can now proceed with the compilation:

```bash
go get -u github.com/bettercap/bettercap
```

Once the build process is concluded, the binary will be located in `go/bin/bettercap`.

#### Linux Deploy Method Fedora based (like Redhat, Centos)

```bash
sudo dnf update
sudo dnf install golang git make automake gcc gcc-c++ kernel-devel libpcap-devel libusb1-devel libnetfilter_queue-devel
```
