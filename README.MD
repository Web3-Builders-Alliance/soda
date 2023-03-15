# SODA: Ship a Solana program inferred from Solana data.

A tool for Solana development and audit that allows you to automate tasks and build Solana programs and clients from: IDLs, on-chain data, existing repos, input and output examples of each instruction, and naming conventions, among other possible resources.
From IDL to whatever you want.

### First Version Features


- **Generate Solana Program and client from IDL.**
- **Write, read and edit IDL in a desktop UI.** 
- **Template based: create your custom building blocks.**
- **Lang and chain agnostic.**
- **Compatibility with Anchor.**

## Getting Started

This is a tool that can read an IDL and outputs the files needed for a Solana program and client code. Current default template outputs an Anchor-Workspace and a NEXT.js, Typescript and Tailwind client.

Do you prefer a different client? the program code in other language? write a template and all your projects can generate from it.


***

#### Steps to run this project

0. prerrequisites: rust, node
1. to run desktop program `cd ui/cargo tauri dev`
2. to run cli `cd cli` and follow usage instrutions bellow

#### CLI Usage

`soda`: from ./idl.json generates code using default template.

`soda <path>` from idl file or url in `<path>` generate project using default template.

`soda <path1> <path2>` from idl file or url in `<path1>` generate project using template in `<path2>`.

## Note

Soda is in active development, so all is subject to change.
This code is unaudited.
Use at your own risk.