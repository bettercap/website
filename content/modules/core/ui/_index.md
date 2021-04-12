---
title: "ui"
date: 2019-03-27T12:39:51+01:00
draft: false
weight: 6
---

A module to manage bettercap's UI updates and installed version.

### Commands

#### `ui.version` 

Print the currently installed UI version.

#### `ui.update`

Download the latest available version of the UI and install it.

### Parameters

| parameter | default | description |
|-----------|---------|-------------|
| `ui.basepath` | `/usr/local/share/bettercap/` | UI base installation path. |
| `ui.tmpfile` | `/tmp/ui.zip` | Temporary file to use while downloading UI updates. |
