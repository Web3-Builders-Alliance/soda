#![allow(non_snake_case, non_camel_case_types)]
use clap::Parser;
use soda_crate::{generate_from_idl, IDL};
use std::error::Error;
use std::fs::{canonicalize, File};

const IDL_DEFAULT_PATH: &str = "./idl.json";
const TEMPLATE_DEFAULT_PATH: &str = "./template/";

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    paths: Vec<String>,
}

fn main() -> Result<(), Box<dyn Error>> {
    env_logger::init();
    let mut template_path = TEMPLATE_DEFAULT_PATH;
    let mut idl_path = IDL_DEFAULT_PATH;
    let cli = Cli::parse();
    if !cli.paths.is_empty() {
        idl_path = &cli.paths[0];
    }
    if cli.paths.len() > 1 {
        template_path = &cli.paths[1];
    }

    let json_file_path = canonicalize(idl_path).unwrap();
    let file = File::open(json_file_path).unwrap();
    let idl: IDL = serde_json::from_reader(file).expect("error while reading json");
    generate_from_idl(".", idl, template_path);
    println!("Project Generated!");
    Ok(())
}
