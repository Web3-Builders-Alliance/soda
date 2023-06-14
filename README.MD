# SODA: Ship a Solana program inferred from Solana data.

A tool for Solana development and audit that allows you to automate tasks and build Solana programs and clients from: IDLs, on-chain data, existing repos, input and output examples of each instruction, and naming conventions, among other possible resources.
From an IDL to whatever you want.

### Current Features

- **Generate Solana Program and client from IDL.**
- **Write, read and edit IDL in a desktop UI.** 
- **Template based: create your custom building blocks.**
- **Lang and chain agnostic.**

## Install Soda CLI

You can install the CLI using cargo or npm.

- Using cargo:
`cargo install soda-cli`

- Using npm:
`npm i @marche/soda-cli`

## Install Soda Desktop

To install the Desktop App you need to [download the lastest release](https://github.com/Web3-Builders-Alliance/soda/releases)

#### CLI Usage

`soda-cli`: from ./idl.json generates code using default template.

`soda-cli <path>` from idl file or url in `<path>` generate project using default template.

`soda-cli <path1> <path2>` from idl file or url in `<path1>` generate project using template in `<path2>`.

## Note

Soda is in active development, so all is subject to change.
This code is unaudited.
Use at your own risk.