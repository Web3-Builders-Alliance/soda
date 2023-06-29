<p align="center">
    <img src="https://github.com/Web3-Builders-Alliance/soda/blob/main/ui/src-tauri/icons/icon.png?raw=true" width="100">
</p>

# SODA: Ship a Solana program inferred from Solana data.

A tool for Solana development and audit that allows you to automate tasks and build Solana programs and clients from: IDLs, on-chain data, existing repos, input and output examples of each instruction, and naming conventions, among other possible resources.
From an IDL to whatever you want.

### Current Features

- **Generate Solana Program and client from IDL.**
- **Write, read and edit IDL in a desktop UI.** 
- **Template based: create your custom building blocks.**
- **Lang and chain agnostic.**

## Install Soda Desktop

To install the Desktop App you need to [download the lastest release](https://github.com/Web3-Builders-Alliance/soda/releases)

## Install Soda CLI

You can install the CLI using cargo or npm.

- Using cargo:
```cargo install soda-cli```

- Using npm:
```npm i @use_soda/soda-cli -g```

#### CLI Usage

```soda-cli create-project <idl_path> <output_path>```

creates a new project from an IDL file.
If no output path is provided, the project will be created in a template folder in the current directory.
If no IDL path is provided, the CLI will try to open an idl.json file in the current directory.

```soda-cli pack-template <template_path> <output_path>```

creates a template file from a template folder.
If no output path is provided, the template will be created in the current directory with the name template.soda
if no template path is provided, the CLI will try to read from a template folder in the current directory.

```soda-cli unpack-template <template_path> <output_path>```

creates a template folder from a template file.
If no output path is provided, the template will be created in the current directory with the name template.
if no template path is provided, the CLI will try to read from a template.soda file in the current directory.

## Note

Soda is in active development, so all is subject to change.
This code is unaudited.
Use at your own risk.

## Powered by
![The Solana Foundation](https://github.com/Web3-Builders-Alliance/soda/blob/main/ui/public/solana.svg?raw=true)
