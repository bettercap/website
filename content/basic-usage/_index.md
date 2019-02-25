---
title: "Basic Usage"
date: 2019-02-25T10:58:28+01:00
weight: 4
draft: false
---

The basic command line arguments ( `bettercap -h` ) are:

|    argument   |  description  |
| ------------- | ------------- |
| `-autostart MODULES` | Comma separated list of modules to auto start. (default to `events.stream, net.recon`) |
| `-caplet FILENAME` | Read commands from this file and execute them in the interactive session. |
| `-eval COMMANDS` | Run one or more commands separated by `;` in the interactive session, used to set variables via command line. |
| `-iface INTERFACE` | Network interface to bind to, if empty the default interface will be auto selected (accepts interface name, ip or mac address). |
| `-gateway-override ADDRESS` | Use the provided IP address instead of the default gateway. If not specified or invalid, the default gateway will be used. |
| `-no-history` | Disable the interactive session history file `~/.bettercap.history`. |
| `-no-colors` | Disable output color effects. |
| `-env-file FILENAME` | Load environment variables from this file if found, set to empty to disable environment persistance. (default `~/bettercap.env`) |
| `-cpu-profile FILENAME` | Write cpu profile file (used for debugging and benchmarking). |
| `-mem-profile FILENAME` | Write memory profile to file (used for debugging and benchmarking). |
| `-silent` | Suppress all logs which are not errors. |
| `-debug` | Enable debug messages. |

If no `-caplet` option is specified, bettercap will start in interactive mode, allowing you to start and stop modules manually, change options and apply new firewall rules on the fly.

To get a grasp of what you can do, type `help` and the general help menu will be shown, you can also have module specific help by using `help module-name` (for instance try with `help net.recon`), to see which modules are running and their configuration at any time, you can use the `active` command.

To print all variables and their values instead, you can use `get *` or `get variable-name` to get a single variable (try with `get gateway.address`), to set a new value you can simply `set variable-name new-value` (a value of `""` will clear the variable contents).

### Basic Commands 

| command | description |
| ------------- | ------------- |
| `help` / `help MODULE` | List available commands or show module specific help if no module name is provided. |
| `active` | Show information about active modules. |
| `quit` / `q` | Close the session and exit. |
| `sleep SECONDS` | Sleep for the given amount of seconds. |
| `get VARIABLE` | Get the value of `VARIABLE`, use `*` for all. |
| `set VARIABLE VALUE` | Set the value of `VARIABLE` to `VALUE`. |
| `read VARIABLE PROMPT` | Show a `PROMPT` to ask the user for input that will be saved inside `VARIABLE`. |
| `clear` | Clear the screen . |
| `include CAPLET` | Load and run this caplet in the current session. |
| `!COMMAND` | Execute a shell command and print its output. |
| `alias MAC NAME` | Assign an alias to a given endpoint given its MAC address (will be persistent on file and used for the `net.show` command. |
