---
title: "Interactive Session"
weight: 2
draft: false
---

Once started the tool with `sudo bettercap` ([click here](#command-line-arguments) for the list of command line arguments), you'll be presented with an interactive session *a la Metasploit* where you'll be able to run commands, enable or disable modules, get or set parameters and so on.

{{% notice tip %}}
Each command can either be executed singularly, or concatenated by the `;` operator, for instance, instead of typing:
<br/>
`clear`<br/>
`net.show`
<br/>
You can simply type:
<br/>
`clear; net.show`
{{% /notice %}}

Functionalities are organized in **[core commands](#core-commands)** (basic commands you'll need to perform operations such as setting a session parameter, getting its value, clearing the screen, etc) and **[session modules](/modules/)** (each will provide a set of feature specific sub commands and use some session parameters for its configuration).

### Caplets

Other than executing commands manually one by one, it is possible to *script* your interactive session using **caplets**. Caplets (script files with a `.cap` extension) are a powerful way to automate your workflow: think about them as the Metasploit's `.rc` files, where each line of the file is a command that'll be executed at runtime. 

For instance, a simple caplet that sets the `ticker.commands` parameter and enables the [net.probe](/modules/ethernet/net.probe/) and [ticker](/modules/core/ticker/) modules would be:

    set ticker.commands 'clear; net.show; events.show 10'
    net.probe on
    ticker on

Once saved as an `example.cap` file, you'll be able to load and execute it via:

    sudo bettercap -caplet /path/to/example.cap

It is also possible to load a caplet by name, without its path and extension:

    sudo bettercap -caplet example

In this case the search order will be:

1. `./example.cap`
2. `./caplets/example.cap`
3. Any folder in the environment variable `$CAPSPATH` (values are separated by `:`, like for `$PATH`).
4. `/usr/local/share/bettercap/caplets/example.cap` (the default path where caplets are installed).

You can install (or update) the predefined caplets (hosted [in this repository](https://github.com/bettercap/caplets)) by using the [caplet module](/modules/core/caplets/), either from the command line:

    sudo bettercap -eval "caplets.update; q"

Or simply from the interactive session:

    > caplets.update

You can then check what's been installed in `/usr/local/share/bettercap/caplets/` with the command:

    > caplets.show

### Command Line Arguments

The basic command line arguments ( `bettercap -h` ) are:

#### `-autostart MODULES`

A comma separated list of modules that are automatically started (default to `events.stream`).

#### `-caplet FILENAME`

Read commands from this file and execute them in the interactive session.

#### `-caplets-path PATH`

Specify an alternative base path for caplets.

#### `-eval COMMANDS`

Run one or more commands separated by `;` in the interactive session, used to set variables via command line.

#### `-script FILENAME`

Load a [session script](/scripting/).

#### `-iface INTERFACE`

Network interface to bind to, if empty the default interface will be auto selected (accepts interface name, ip or mac address)

#### `-gateway-override ADDRESS`

Use the provided IP address instead of the default gateway. If not specified or invalid, the default gateway will be auto detected and used.

#### `-no-history`

Disable the interactive session history file `~/.bettercap.history`.

#### `-no-colors` 

Disable terminal colors and effects.

#### `-env-file FILENAME` 

Preload the parameters values from this file if found, set to empty to disable environment persistance (default `~/bettercap.env`).

#### `-silent` 

Suppress all logs which are not errors.

#### `-cpu-profile FILENAME`

Write a CPU profile file when exiting (used for debugging and benchmarking).

#### `-mem-profile FILENAME` 

Write memory profile file when exiting (used for debugging and benchmarking).

#### `-debug`

Enable debug messages (**must be used [to report bugs](/contributing/#reporting-bugs)**).

#### `-version`

Print version and build information, then exit (**must be used [to report bugs](/contributing/#reporting-bugs)**).

### Core Commands

#### `help`

Will list all available commands and print the name of each module and its status (*running* or *not running*).

#### `help MODULE_NAME`

Will print the module specific help menu, with its sub commands and parameters.

#### `active` 

Show which modules are running and their parameters.

#### `quit` or `q` 

Close the session and exit.

#### `sleep SECONDS` 

Sleep for the given amount of seconds.

#### `get PARAMETER`

Get the value of the specified parameter, use `*` for all.

#### `set PARAMETER VALUE`

Set the value of `PARAMETER` to `VALUE`, use `""` or `''` to clear its contents.

#### `read PARAMETER PROMPT` 

Show a `PROMPT` to ask the user for input that will be saved inside `PARAMETER`.

#### `clear`

Clear the screen.

#### `include CAPLET` 

Load and run this caplet in the current session, the same behaviour can be achieved by just specifying the caplet name as a command.

#### `!COMMAND` 

Execute a shell command and print its output into the session.

#### `alias MAC NAME`

Assign an alias to a given endpoint given its MAC address (will be persistent on `~/bettercap.aliases`).

{{% notice tip %}}
Being persisted on disk, aliases are shared across each module and bettercap session. This means that if you set an alias for a computer while on the same network, the same alias will be shown and used, for instance, by the WiFi modules when resolving wireless stations BSSID (you'll see who's connecting to what).
{{% /notice %}}

### Customizing the Prompt

The interactive session prompt can be modified by setting the `$` variable, for instance this:

    set $ something

Will set the prompt to the string `something`. You can also access parameters and use colors/effects by using the proper syntax and operators as you can see from the `$` parameter default value:

    > get $


    {by}{fw}{cidr} {fb}> {env.iface.ipv4} {reset} {bold}» {reset}

The available effects are:

| Operator | Description |
| ------------- | ------------- |
| `{bold}` | Set text to bold. |
| `{dim}` | Set dim effect on text. |
| `{r}` | Set text foreground color to red. |
| `{g}` | Set text foreground color to green. |
| `{b}` | Set text foreground color to blue. |
| `{y}` | Set text foreground color to yellow. |
| `{fb}` | Set text foreground color to black. |
| `{fw}` | Set text foreground color to white. |
| `{bdg}` | Set text background color to dark gray. |
| `{br}` | Set text background color to red. |
| `{bg}` | Set text background color to green. |
| `{by}` | Set text background color to yellow. |
| `{blb}` | Set text background color to light blue. |
| `{reset}` | Reset text effects (added by default at the end of the prompt if not specified). |

There are also other operators you can use in order to access specific information about the session.

| Operator | Description |
| ------------- | ------------- |
| `{cidr}` | Selected interface subnet CIDR. |
| `{net.sent}` | Number of bytes being sent by the tool on the network. |
| `{net.sent.human}` | Number of bytes being sent by the tool on the network (human readable form). |
| `{net.errors}` | Number of errors while sending packets. |
| `{net.received}` | Number of bytes being sniffed from the tool on the network. |
| `{net.received.human}` | Number of bytes being sniffed from the tool from the network (human readable form). |
| `{net.packets}` | Number of packets being sniffed by the tool from the network. |

And finally, you can access and use any variable that has been declared in the interactive session using the `{env.NAME-OF-THE-VAR}` operator, for instance, the default prompt is using `{env.iface.ipv4}` that is replaced by the `iface.ipv4` session variable contents ( you can check it using the `get iface.ipv4` command ).

### Examples

Set the `arp.spoof.targets` parameter and enable the `arp.spoof` module:

```sh
sudo bettercap -eval "set arp.spoof.targets 192.168.1.20; arp.spoof on"
```

To quickly get the help menu of a module and quit bettercap (basically like a *man* command), you can use the `-eval` argument, for example:

```sh
sudo bettercap -eval "help net.recon; q"
```

Ask the user to fill the `arp.spoof.targets` parameter:

```
> read arp.spoof.targets "Select the target to spoof: "
```

Set the alias *"MY IPAD"* to the device with MAC address `DE:AD:DE:AD:BE:EF`:

```
> alias DE:AD:DE:AD:BE:EF MY IPAD
```
