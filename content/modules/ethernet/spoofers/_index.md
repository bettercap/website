---
title: "Spoofers"
date: 2019-02-25T12:57:36+01:00
draft: false
weight: 6
---

Spoofing modules used to perform Man-in-the-Middle attacks:

{{% children depth="999" %}}

### What is a MITM Attack? 

According to [Wikipedia](https://en.wikipedia.org/wiki/Man-in-the-middle_attack):

> In cryptography and computer security, a man-in-the-middle attack (often abbreviated to MITM, MitM, MIM, MiM attack or MITMA) is an attack where the attacker secretly relays and possibly alters the communication between two parties who believe they are directly communicating with each other. Man-in-the-middle attacks can be thought about through a chess analogy.
    Mallory, who barely knows how to play chess, claims that she can play two grandmasters simultaneously and either win one game or draw both. She waits for the first grandmaster to make a move and then makes this same move against the second grandmaster. When the second grandmaster responds, Mallory makes the same play against the first. She plays the entire game this way and cannot lose.
    A man-in-the-middle attack is a similar strategy and can be used against many cryptographic protocols. One example of man-in-the-middle attacks is active eavesdropping, in which the attacker makes independent connections with the victims and relays messages between them to make them believe they are talking directly to each other over a private connection, when in fact the entire conversation is controlled by the attacker. The attacker must be able to intercept all relevant messages passing between the two victims and inject new ones. This is straightforward in many circumstances; for example, an attacker within reception range of an unencrypted Wi-Fi wireless access point, can insert himself as a man-in-the-middle.

This is quite a generic description, mostly because ( if we're talking about network MITM attacks ), the logic and details heavily rely on the technique being used ( more in the spoofing section ).

Nevertheless we can simplify the concept with an example. When you connect to some network ( your home network, some public WiFi, StarBucks, etc ), the router/switch is responsible for forwarding all of your packets to the correct destination, during a MITM attack we "force" the network to consider our device as the router ( we "spoof" the original router/switch address in some way ):

![mitm](/legacy/assets/img/mitm.jpg)

Once this happens, all of the network traffic goes through your computer instead of the legit router/switch and at that point you can do pretty much everything you want, from just [sniffing for specific data](/modules/ethernet/net.sniff/) ( emails, passwords, cookies, etc of other people on your network ) to [actively intercepting and proxying](/modules/ethernet/proxies/) all the requests of some specific protocol in order to modify them on the fly ( you can, for instance, replace all images of all websites being visited by everyone, kill connections, etc ).
