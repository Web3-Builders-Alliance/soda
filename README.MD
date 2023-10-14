<p align="center">
  <img  src="https://github.com/Web3-Builders-Alliance/soda/blob/main/assets/soda.png?raw=true"  width="200">
</p>  

**Fast Code Generator. Build program prototypes up to Solana speed! Generate mobile and web clients from Solana programs.**

---

### Current Features
-  Generate Solana Programs and clients' source code from an IDL
-  Write, read and edit IDL in a desktop UI
-  Template based:
	- Create your custom building blocks
	- Handlebars with Rhai scripting available
	- Common helpers added by default
	- Custom helpers support
	- Binary Files support
	- Filesystem based and dynamic paths
	- Lang agnostic
	- Interconvertible portable template file format and template folder, both supported by CLI and Desktop App 
-  Available Templates:
	- NextJs-Tailwind Client
	- Flutter Client
	- React Native Client
	- Anchor Program
	- Seahorse Program



## The best way to use soda is using the web https://machine.usesoda.dev/

## Install Soda Desktop
  
To install the Desktop App you need to [download the lastest release](https://github.com/Web3-Builders-Alliance/soda/releases)

(Optionally you can download templates.zip file if you want to use other templates than the default one, or just clone this repo an use it from the templates folder)

**Provisional Steps:** We are still working in add code signing in our app so at this point a security warning probably will show up. Until we finish the code signing process you will need to check how to open the app in your OS.

## Install Soda CLI

You can install the CLI using cargo or npm.
- Using cargo (recommended):
```cargo install soda-cli```

- Using npm:
```npm i @use_soda/soda-cli -g```

#### CLI Usage

```soda-cli create-project <idl_path> <template_path>```
Creates a new project from an IDL file.
If no template path is provided, the project will try to use a template.soda file in the current directory.
If no IDL path is provided, the CLI will try to open an idl.json file in the current directory.

```soda-cli pack-template <template_path> <output_path>```
Creates a template file from a template folder.
If no output path is provided, the template will be created in the current directory with the name template.soda
if no template path is provided, the CLI will try to read from a template folder in the current directory.

```soda-cli unpack-template <template_path> <output_path>```
Creates a template folder from a template file.
If no output path is provided, the template folder will be created in the current directory with the name template.
If no template path is provided, the CLI will try to read from a template.soda file in the current directory.


**Note: Soda is in active development, so all is subject to change. This code is unaudited. Use at your own risk.**
