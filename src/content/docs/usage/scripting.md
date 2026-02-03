---
title: Scripting
description: bettercap has a builtin JavaScript engine based on Otto that you can use to interact with the session and automate tasks.
sidebar:
  order: 3
---

bettercap has a builtin **JavaScript engine** [based on Otto](https://github.com/robertkrimen/otto).
Use it to interact with the session and automate tasks.

Session scripts can be loaded using the `-script FILENAME` command line argument:

```bash
sudo bettercap -script /path/to/script.js
```

Once loaded the script can run session commands:

```js
run("net.probe on");
```

or shell commands:

```js
run("!touch /tmp/yo");
```

register for specific events:

```js
onEvent("wifi.client.handshake", function (event) {
  var data = event.data;
  var gps = session.GPS; // session is a global object with all the session data
  var what = "handshake";

  if (data.pmkid != null) {
    what = "RSN PMKID";
  } else if (data.full) {
    what += " (full)";
  } else if (data.half) {
    what += " (half)";
  }

  log("💰 Captured " + what + ":");
  log(" station: " + data.station);
  log(" ap: " + data.ap);
  log(
    " lat:" +
      gps.Latitude +
      " lon:" +
      gps.Longitude +
      " updated_at:" +
      gps.Updated.String()
  );
});
```

register for any event:

```js
onEvent(function (event) {
  log(event.tag);
});
```

perform HTTP queries:

```js
var resp = http.Get(url, {});
if (resp.Error) {
  log(resp.Error.Error());
} else {
  log(resp.JSON.something);
}
```

Check the [scripts repository](http://github.com/bettercap/scripts) for example scripts.

:::note
The JS interpreter is [limited to ES5](https://github.com/robertkrimen/otto?tab=readme-ov-file#caveat-emptor).
This means **no** `for/of`, typed arrays, or classes.
:::
