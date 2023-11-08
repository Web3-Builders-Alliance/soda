<p align="center">
  <img src="https://github.com/Web3-Builders-Alliance/soda/blob/main/assets/soda.png?raw=true" width="200">
</p>

# Soda: Fast Code Generator for Solana

Soda is a powerful code generator that allows you to build program prototypes at Solana speed. It enables you to generate mobile and web clients from Solana programs effortlessly.

## Current Features

- Generate Solana Programs and client source code from an IDL.
- Write, read, and edit IDL in a desktop UI.
- Template-based approach:
  - Create custom building blocks.
  - Use Handlebars with Rhai scripting.
  - Common helpers are included by default.
  - Support for custom helpers.
  - Handle binary files and dynamic paths.
  - Language-agnostic.
  - Portable template file format and template folders, supported by CLI and Desktop App.
- Available Templates:
  - NextJs-Tailwind Client.
  - Flutter Client.
  - React Native Client.
  - Anchor Program.
  - Seahorse Program.

## How to Use Soda

The best way to use Soda is through the web application: [Soda Web](https://machine.usesoda.dev/).

### Install Soda Desktop

To use the Desktop App, download the latest release from the [Soda GitHub Releases](https://github.com/Web3-Builders-Alliance/soda/releases) page.

(Optional: You can also download the templates.zip file if you want to use templates other than the default, or clone this repository and use templates from the templates folder.)

**Provisional Steps:** We are still working on adding code signing to our app, so you may encounter a security warning. Until we finish the code signing process, you might need to check how to open the app on your OS.

### Install Soda CLI

You can install the CLI using either Cargo or NPM.

- Using Cargo (recommended):
  ```
  cargo install soda-cli
  ```

- Using NPM:
  ```
  npm install @use_soda/soda-cli -g
  ```

#### CLI Usage

```shell
soda-cli create-project <idl_path> <template_path>
```

Creates a new project from an IDL file. If no template path is provided, the project will attempt to use a `template.soda` file in the current directory. If no IDL path is provided, the CLI will try to open an `idl.json` file in the current directory.

```shell
soda-cli pack-template <template_path> <output_path>
```

Creates a template file from a template folder. If no output path is provided, the template will be created in the current directory with the name `template.soda`. If no template path is provided, the CLI will attempt to read from a template folder in the current directory.

```shell
soda-cli unpack-template <template_path> <output_path>
```

Creates a template folder from a template file. If no output path is provided, the template folder will be created in the current directory with the name `template`. If no template path is provided, the CLI will try to read from a `template.soda` file in the current directory.

**Note: Soda is actively under development, and everything is subject to change. This code is unaudited; use it at your own risk.**
