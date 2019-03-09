---
title: "Contributing"
date: 2019-02-25T11:33:49+01:00
weight: 2
draft: false
---

As any other open source projects, there're many ways you can contribute to bettercap depending on your skills as a developer or will to help as a user.

## Improving the Documentation

You can improve this documentation by [forking its repository](https://github.com/bettercap/website), updating the contents and sending a pull request.

## Reporting Bugs

If you find bugs or inconsistencies while using bettercap, you can create an Issue using the GitHub Issue tracker, but before doing that please make sure that:

* You read this documentation.
* You are using the [latest stable version](https://github.com/bettercap/bettercap/releases) of bettercap.
* You already searched [other issues](https://github.com/bettercap/bettercap/issues) to see if your problem or request was already reported.

Once you've gone through this list, open an issue and please give us as much as informations as possible in order for us to fix the bug as soon as possible, such as:

* bettercap version you are using ( `bettercap -version` ).
* Go version if building from sources.
* OS version and architecture you are using.
* Command line arguments you are using.
* Caplet code you are using or the interactive session commands.
* **Full debug output** while reproducing the issue ( `bettercap -debug ...` ).
* The steps to reproduce the bug.

## Sending a Pull Request

If you know how to code in Go and have ideas to improve bettercap, you're very welcome to send us pull requests, we'll be happy to merge them whenever they comply to the following rules:

* You have at least manually tested your code, ideally you've created actual tests for it.
* Respect our coding standard, 2 spaces indentation and modular code.
* There're no conflicts with the current master branch.
* Your commit messages are enough explanatory to us.

There're plenty of things you can to do improve the software:

* Implement a new session module (in Go).
* Implement a new proxy module (in Javascript).
* Implement a new caplet.
* Fix, extend or improve the core.
