#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_snake_case, non_camel_case_types)]

use handlebars::{handlebars_helper, Handlebars};
use serde_derive::{self, Deserialize, Serialize};
use std::error::Error;
use std::fs::{canonicalize, create_dir_all, File};
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use walkdir::WalkDir;

const TEMPLATE_DEFAULT_PATH: &str = "/Users/juan/soda/src/template";

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let open_idl = CustomMenuItem::new("open_idl".to_string(), "Open IDL File");
    let generate_idl = CustomMenuItem::new("generate_idl".to_string(), "Save IDL File");
    let generate_project =
        CustomMenuItem::new("generate_project".to_string(), "Generate Project's Files");
    let new_project = CustomMenuItem::new("new_project".to_string(), "New Project");
    let submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(open_idl)
            .add_item(new_project)
            .add_item(generate_project)
            .add_item(generate_idl)
            .add_item(quit)
            .add_item(close),
    );
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            "open_idl" => {
                event.window().close().unwrap();
            }
            "new_project" => {
                event.window().close().unwrap();
            }
            "generate_project" => {
                event.window().close().unwrap();
            }
            "generate_idl" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(idl: &str) -> String {
    let mut template_path = TEMPLATE_DEFAULT_PATH;

    let idl: IDL = serde_json::from_str(idl).expect("error while reading json");

    handlebars_helper!(snakecase: |name: String| name.chars().fold(
            "".to_string(),
            |acc, letter| if letter.is_uppercase(){
                format!("{}_{}",acc,letter.to_lowercase())
            }else{
                format!("{}{}",acc,letter)
            }
        )
    );

    handlebars_helper!(pascalcase: |name: String|{
            let mut passcalcaseChars: Vec<char> = name.chars().collect();
            let first: Vec<char> = passcalcaseChars[0].to_uppercase().to_string().chars().collect();
            passcalcaseChars[0] = *first.first().unwrap();
            let passcalcase: String = passcalcaseChars.into_iter().collect();
            passcalcase
        }
    );

    handlebars_helper!(type_from_account_field: |account_field_type:  InstructionType|
        match account_field_type {
            InstructionType::String(name)=>name,
            InstructionType::vec(content)=>{
                format!("Vec{}{}{}", "<", match content {
                    InstructionTypeVec::String(name)=>name,
                    InstructionTypeVec::defined(content)=>content.defined,
                    InstructionTypeVec::vec(content)=>{
                        match content.vec {
                            VecEnum::String(name)=>name,
                            VecEnum::defined(content)=>{content.defined},
                        }
                    },
                },">")
            },
            InstructionType::defined(content)=>content.defined,
            InstructionType::option(content)=> content.option,
        }.replace("publicKey", "Pubkey")
        .replace("string", "String")
    );

    handlebars_helper!(debug_idl: |idl: IDL|serde_json::to_string(&idl).unwrap());

    let mut handlebars = Handlebars::new();

    handlebars.register_helper("snakecase", Box::new(snakecase));
    handlebars.register_helper("pascalcase", Box::new(pascalcase));
    handlebars.register_helper("type_from_account_field", Box::new(type_from_account_field));
    handlebars.register_helper("debug_idl", Box::new(debug_idl));

    for entry in WalkDir::new(format!("{}/helpers/", template_path)) {
        match entry {
            Ok(val) => {
                let path = format!("{}", val.path().to_string_lossy());
                if path.split('.').count() > 1 {
                    let helper_name = path
                        .get(0..path.len() - 5)
                        .unwrap()
                        .split('/')
                        .last()
                        .unwrap();
                    handlebars
                        .register_script_helper_file(helper_name, (*path).to_string())
                        .unwrap();
                }
            }
            Err(err) => println!("{}", err),
        }
    }
    for entry in WalkDir::new(format!("{}/files/", template_path)) {
        let entry = entry.unwrap();
        let path = format!("{}", entry.path().display());
        let rel_path = path.get(template_path.len() + 6..path.len()).unwrap();
        if path.split('.').last().unwrap() == "hbs" {
            let file_path = handlebars
                .render_template(rel_path.get(0..rel_path.len() - 4).unwrap(), &idl)
                .unwrap();
            handlebars
                .register_template_file("template", (*path).to_string())
                .unwrap();
            let mut output_lib_file = File::create(format!("{}/{}", &idl.name, file_path)).unwrap();
            handlebars
                .render_to_write("template", &idl, &mut output_lib_file)
                .unwrap();
            println!("{}", file_path);
        } else {
            let dir_path = handlebars.render_template(rel_path, &idl).unwrap();
            create_dir_all(format!("{}/{}", &idl.name, dir_path)).unwrap();
            println!("{}", dir_path);
        };
    }

    format!("Project Generated!")
}

#[derive(Deserialize, Serialize, Debug)]
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
    #[serde(default)]
    metadata: Metadata,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Instruction {
    name: String,
    #[serde(default)]
    accounts: Vec<InstructionAccount>,
    #[serde(default)]
    args: Vec<InstructionArgs>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Accounts {
    name: String,
    #[serde(rename = "type")]
    type_: Type,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Types {
    name: String,
    #[serde(rename = "type")]
    type_: Kind,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Event {
    name: String,
    fields: Vec<Field>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ErrorDesc {
    code: u64,
    name: String,
    msg: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct InstructionAccount {
    name: String,
    isMut: bool,
    isSigner: bool,
    #[serde(default)]
    pda: PDA,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct InstructionArgs {
    name: String,
    #[serde(rename = "type")]
    type_: InstructionType,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Type {
    kind: String,
    fields: Vec<TypeFields>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Kind {
    kind: String,
    #[serde(default)]
    variants: Vec<Name>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Field {
    name: String,
    #[serde(rename = "type")]
    type_: InstructionType,
    index: bool,
}

#[derive(Deserialize, Serialize, Default, Debug)]
pub struct PDA {
    seeds: Vec<Seed>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Seed {
    kind: String,
    #[serde(rename = "type")]
    type_: String,
    #[serde(default)]
    value: String,
    #[serde(default)]
    path: String,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(untagged)]
pub enum InstructionType {
    String(String),
    vec(InstructionTypeVec),
    defined(Defined),
    option(OptionType),
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(untagged)]
pub enum InstructionTypeVec {
    String(String),
    defined(Defined),
    vec(Vec_),
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Defined {
    defined: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Vec_ {
    vec: VecEnum,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(untagged)]
pub enum VecEnum {
    String(String),
    defined(Defined),
}

#[derive(Deserialize, Serialize, Debug)]
pub struct OptionType {
    option: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Name {
    name: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct TypeFields {
    name: String,
    #[serde(rename = "type")]
    type_: InstructionType,
}

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct Metadata {
    address: String,
}
