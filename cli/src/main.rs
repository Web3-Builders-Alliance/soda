#![allow(non_snake_case, non_camel_case_types)]
use clap::Parser;
use soda_sol::*;
use std::error::Error;
use std::fs::{canonicalize, File};

const IDL_DEFAULT_PATH: &str = "./idl.json";
const TEMPLATE_DEFAULT_PATH: &str = "./template";
const TEMPLATE_FILE_NAME: &str = "template.soda";

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    paths: Vec<String>,
}

fn main() -> Result<(), Box<dyn Error>> {
    let cli = Cli::parse();
    if !cli.paths.is_empty() {
        match &cli.paths[0] {
            command if command == "pack-template" => {
                let template_path = if cli.paths.len() > 1 {
                    &cli.paths[1]
                } else {
                    TEMPLATE_DEFAULT_PATH
                };
                let file_path = if cli.paths.len() > 2 {
                    &cli.paths[2]
                } else {
                    TEMPLATE_FILE_NAME                };
                let template = get_template_from_fs(template_path);
                save_template(template, file_path );
            }
            command if command == "unpack-template" => {
                let template_path = if cli.paths.len() > 1 {
                    &cli.paths[1]
                } else {
                    TEMPLATE_FILE_NAME
                };
                let base_path = if cli.paths.len() > 2 {
                    &cli.paths[2]
                } else {
                    TEMPLATE_DEFAULT_PATH
                };
                let template = load_template(template_path);
                write_project_to_fs(template.files, base_path);
                let mut helpers = vec![];
                for helper in template.helpers {
                    helpers.push(TemplateFile {
                        path: format!("helpers/{}.hbs", helper.helper_name),
                        content: Content::String(helper.script),
                    });
                }
                write_project_to_fs(helpers, base_path);
                println!("Template Generated!");
            }
            command if command == "create-project" => {
                let idl_path = if cli.paths.len() > 1 {
                    &cli.paths[1]
                } else {
                    IDL_DEFAULT_PATH
                };
                let template_path = if cli.paths.len() > 2 {
                    &cli.paths[2]
                } else {
                    TEMPLATE_DEFAULT_PATH
                };
                let json_file_path = canonicalize(idl_path).unwrap();
                let file = File::open(json_file_path).unwrap();
                let idl: IDL = serde_json::from_reader(file).expect("error while reading json");
                generate_from_idl(".", idl, template_path);
                println!("Project Generated!");
            }
            _ => {
                display_help();
            }
        }
    } else {
        display_help();
    };
    Ok(())
}

fn display_help() {
    println!("Commands:");
    println!("  create-project [idl_path] [template_path]");
    println!("  pack-template [template_path] [file_path]");
    println!("  unpack-template [template_path]");
}
