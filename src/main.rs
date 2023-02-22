#![allow(unused_imports, dead_code, non_snake_case, non_camel_case_types)]
use env_logger;
use handlebars::Handlebars;
use handlebars::{to_json, Context, Helper, JsonRender, Output, RenderContext, RenderError};
use serde;
use serde::{Deserialize, Serialize};
use serde_derive::{self, Deserialize, Serialize};
use serde_json::json;
use serde_json::value::{self, Map, Value as Json};
use std::error::Error;
use std::fs::{canonicalize, create_dir_all, File};
use std::io::{Read, Write};
use walkdir::WalkDir;

fn main() -> Result<(), Box<dyn Error>> {
    env_logger::init();
    let templates_path = "src/template/";
    let json_file_path = canonicalize("./idl.json").unwrap();
    let file = File::open(json_file_path).unwrap();
    let idl: IDL = serde_json::from_reader(file).expect("error while reading json");

    let mut handlebars = Handlebars::new();

    println!("Creating...");
    for entry in WalkDir::new(templates_path) {
        let entry = entry.unwrap();
        let path = format!("{}", entry.path().display());
        let rel_path = path.get(templates_path.len()..path.len()).unwrap();
        if path.split(".").last().unwrap() == "hbs" {
            let file_path = handlebars
                .render_template(rel_path.get(0..rel_path.len() - 4).unwrap(), &idl)
                .unwrap();
            handlebars
                .register_template_file("template", (*path).to_string())
                .unwrap();
            let mut output_lib_file = File::create(format!("output/{}", file_path))?;
            handlebars.render_to_write("template", &idl, &mut output_lib_file)?;
            println!("{}", file_path);
        } else {
            let dir_path = handlebars.render_template(rel_path, &idl).unwrap();
            create_dir_all(format!("output/{}", dir_path))?;
            println!("{}", dir_path);
        };
    }

    println!("Project Generated!");
    Ok(())
}

#[derive(Deserialize, Serialize)]
pub struct IDL {
    version: String,
    name: String,
    instructions: Vec<Instruction>,
    #[serde(default)]
    accounts: Vec<Accounts>,
    #[serde(default)]
    types: Vec<Types>,
    #[serde(default)]
    events: Vec<Event>,
    #[serde(default)]
    errors: Vec<ErrorDesc>,
}

#[derive(Deserialize, Serialize)]
pub struct Instruction {
    name: String,
    accounts: Vec<InstructionAccount>,
    args: Vec<InstructionArgs>,
}

#[derive(Deserialize, Serialize)]
pub struct Accounts {
    name: String,
    #[serde(rename = "type")]
    type_: Type,
}

#[derive(Deserialize, Serialize)]
pub struct Types {
    name: String,
    #[serde(rename = "type")]
    type_: Kind,
}

#[derive(Deserialize, Serialize)]
pub struct Event {
    name: String,
    fields: Vec<Field>,
}

#[derive(Deserialize, Serialize)]
pub struct ErrorDesc {
    code: u64,
    name: String,
    msg: String,
}

#[derive(Deserialize, Serialize)]
pub struct InstructionAccount {
    name: String,
    isMut: bool,
    isSigner: bool,
    #[serde(default)]
    pda: PDA,
}

#[derive(Deserialize, Serialize)]
pub struct InstructionArgs {
    name: String,
    #[serde(rename = "type")]
    type_: InstructionType,
}

#[derive(Deserialize, Serialize)]
pub struct Type {
    kind: String,
    fields: Vec<TypeFields>,
}

#[derive(Deserialize, Serialize)]
pub struct Kind {
    kind: String,
    variants: Vec<Name>,
}

#[derive(Deserialize, Serialize)]
pub struct Field {
    name: String,
    #[serde(rename = "type")]
    type_: String,
    index: bool,
}

#[derive(Deserialize, Serialize, Default)]
pub struct PDA {
    seeds: Vec<Seed>,
}

#[derive(Deserialize, Serialize)]
pub struct Seed {
    kind: String,
    #[serde(rename = "type")]
    type_: String,
    #[serde(default)]
    value: String,
    #[serde(default)]
    path: String,
}

#[derive(Deserialize, Serialize)]
pub enum InstructionType {
    Ok(String),
    vec(InstructionTypeVec),
}

#[derive(Deserialize, Serialize)]
pub enum InstructionTypeVec {
    Ok(String),
    defined(Defined),
}

#[derive(Deserialize, Serialize)]
pub struct Defined {
    defined: String,
}

#[derive(Deserialize, Serialize)]
pub struct Name {
    name: String,
}

#[derive(Deserialize, Serialize)]
pub struct TypeFields {
    name: String,
    #[serde(rename = "type")]
    type_: InstructionType,
}
