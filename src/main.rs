#![allow(non_snake_case, non_camel_case_types)]
use clap::Parser;
use handlebars::{handlebars_helper, Handlebars};
use serde_derive::{self, Deserialize, Serialize};
use std::error::Error;
use std::fs::{canonicalize, create_dir_all, File};
use walkdir::WalkDir;

const IDL_DEFAULT_PATH: &str = "./idl.json";
const TEMPLATE_DEFAULT_PATH: &str = "src/template/";

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
        )
    ;

    handlebars_helper!(debug_idl: |idl: IDL|serde_json::to_string(&idl).unwrap());

    let mut handlebars = Handlebars::new();

    handlebars.register_helper("snakecase", Box::new(snakecase));
    handlebars.register_helper("pascalcase", Box::new(pascalcase));
    handlebars.register_helper("type_from_account_field", Box::new(type_from_account_field));
    handlebars.register_helper("debug_idl", Box::new(debug_idl));

    println!(
        "Creating project from idl {} and template {}",
        idl_path, template_path
    );
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
                    handlebars.register_script_helper_file(helper_name, (*path).to_string())?;
                }
            }
            Err(err) => println!("{}", err),
        }
    }
    for entry in WalkDir::new(format!("{}/files/", template_path)) {
        let entry = entry.unwrap();
        let path = format!("{}", entry.path().display());
        let rel_path = path.get(template_path.len()+6..path.len()).unwrap();
        if path.split('.').last().unwrap() == "hbs" {
            let file_path = handlebars
                .render_template(rel_path.get(0..rel_path.len() - 4).unwrap(), &idl)
                .unwrap();
            handlebars
                .register_template_file("template", (*path).to_string())
                .unwrap();
            let mut output_lib_file = File::create(format!("{}/{}", &idl.name, file_path))?;
            handlebars.render_to_write("template", &idl, &mut output_lib_file)?;
            println!("{}", file_path);
        } else {
            let dir_path = handlebars.render_template(rel_path, &idl).unwrap();
            create_dir_all(format!("{}/{}", &idl.name, dir_path))?;
            println!("{}", dir_path);
        };
    }

    println!("Project Generated!");
    Ok(())
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
    accounts: Vec<InstructionAccount>,
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
    address: String
}
