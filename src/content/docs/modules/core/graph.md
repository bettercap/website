---
title: graph
description: A module to build a graph of WiFi and LAN nodes.
---

A module to build a graph of WiFi and LAN nodes.

### Commands

#### `graph on`

Start the graph module.

#### `graph off`

Stop the graph module.

#### `graph.to_dot MAC?`

Generate a dot graph file from the current graph (filtering by an optional MAC).

#### `graph.to_json MAC?`

Generate a JSON file from the current graph (filtering by an optional MAC).

### Parameters

| Parameter            | Default                            | Description                                     |
| -------------------- | ---------------------------------- | ----------------------------------------------- |
| `graph.disconnected` | `false`                            | Include disconnected edges in the output graph. |
| `graph.dot.layout`   | `neato`                            | Layout for dot output.                          |
| `graph.dot.name`     | `bettergraph`                      | Graph name in the dot output.                   |
| `graph.dot.output`   | `bettergraph.dot`                  | File name for dot output.                       |
| `graph.json.output`  | `bettergraph.json`                 | File name for JSON output.                      |
| `graph.path`         | `/usr/local/share/bettercap/graph` | Base path for the graph database.               |
| `graph.privacy`      | `false`                            | Obfuscate mac addresses.                        |
