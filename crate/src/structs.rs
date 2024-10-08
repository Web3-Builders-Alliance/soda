#![allow(non_snake_case, non_camel_case_types)]

use serde_derive::{self, Deserialize, Serialize};
use std::convert::From;
#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct IDL {
    #[serde(default)]
    pub version: String,
    pub name: String,
    #[serde(default)]
    pub instructions: Vec<Instruction>,
    #[serde(default)]
    pub accounts: Vec<Accounts>,
    #[serde(default)]
    pub types: Vec<Types>,
    #[serde(default)]
    pub events: Vec<Event>,
    #[serde(default)]
    pub errors: Vec<ErrorDesc>,
    #[serde(default)]
    pub metadata: Metadata,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Data {
    #[serde(default)]
    pub version: String,
    pub name: String,
    pub instructions: Vec<Instruction>,
    #[serde(default)]
    pub accounts: Vec<Accounts>,
    #[serde(default)]
    pub types: Vec<Types>,
    #[serde(default)]
    pub events: Vec<Event>,
    #[serde(default)]
    pub errors: Vec<ErrorDesc>,
    #[serde(default)]
    pub metadata: Metadata,
    pub path_replacements: Vec<String>,
}

impl From<IDL> for Data {
    fn from(idl: IDL) -> Self {
        Data {
            version: idl.version,
            name: idl.name,
            instructions: idl.instructions,
            accounts: idl.accounts,
            types: idl.types,
            events: idl.events,
            errors: idl.errors,
            metadata: idl.metadata,
            path_replacements: [].to_vec(),
        }
    }
}

impl From<Data> for IDL {
    fn from(idl: Data) -> Self {
        IDL {
            version: idl.version,
            name: idl.name,
            instructions: idl.instructions,
            accounts: idl.accounts,
            types: idl.types,
            events: idl.events,
            errors: idl.errors,
            metadata: idl.metadata,
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Template {
    pub files: Vec<TemplateFile>,
    pub helpers: Vec<TemplateHelper>,
    #[serde(default)]
    pub metadata: TemplateMetadata,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TemplateMetadata {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub version: String,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub authors: String,
    #[serde(default)]
    pub image: String,
    #[serde(default)]
    pub tags: String,
}

impl Default for TemplateMetadata {
    fn default() -> Self {
        TemplateMetadata {
            name: "".to_string(),
            version: "".to_string(),
            description: "".to_string(),
            authors: "".to_string(),
            image: "".to_string(),
            tags: "".to_string(),
        }
    }
}
#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TemplateFile {
    pub path: String,
    pub content: Content,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TemplateHelper {
    pub helper_name: String,
    pub script: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Instruction {
    pub name: String,
    #[serde(default)]
    pub accounts: Vec<InstructionAccount>,
    #[serde(default)]
    pub args: Vec<InstructionArgs>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Accounts {
    #[serde(default)]
    pub(crate) name: String,
    #[serde(default)]
    #[serde(rename = "type")]
    pub(crate) kind: Type,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Types {
    #[serde(default)]
    pub(crate) name: String,
    #[serde(default)]
    #[serde(rename = "type")]
    pub(crate) kind: Kind,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Event {
    #[serde(default)]
    pub(crate) name: String,
    #[serde(default)]
    pub(crate) fields: Vec<Field>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct ErrorDesc {
    pub(crate) code: u64,
    pub(crate) name: String,
    #[serde(default)]
    pub(crate) msg: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct InstructionAccount {
    pub name: String,
    #[serde(default)]
    pub isMut: bool,
    #[serde(default)]
    pub isSigner: bool,
    #[serde(default)]
    pub pda: PDA,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct InstructionArgs {
    pub name: String,
    #[serde(rename = "type")]
    pub kind: InstructionType,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Type {
    pub(crate) kind: String,
    #[serde(default)]
    pub(crate) fields: Vec<TypeFields>,
}

impl Default for Type {
    fn default() -> Self {
        Type {
            kind: "struct".to_string(),
            fields: [].to_vec(),
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Kind {
    pub(crate) kind: String,
    pub(crate) variants: Option<Vec<Name>>,
    pub(crate) fields: Option<Vec<KindField>>,   
}

impl Default for Kind {
    fn default() -> Self {
        Kind {
            kind: "struct".to_string(),
            variants: None,
            fields: Some([].to_vec()),
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Field {
    #[serde(default)]
    pub(crate) name: String,
    #[serde(rename = "type")]
    pub(crate) kind: InstructionType,
    pub(crate) index: bool,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct KindField {
    pub(crate) name: String,
    #[serde(rename = "type")]
    pub(crate) kind: InstructionType,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct PDA {
    pub(crate) seeds: Vec<Seed>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Seed {
    pub(crate) kind: String,
    #[serde(default, rename = "type")]
    pub(crate) of_type: VecEnum,
    #[serde(default)]
    pub(crate) value: serde_json::Value,
    #[serde(default)]
    pub(crate) path: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub enum InstructionType {
    Array(Box<InstructionType>, usize),
    Bool,
    Bytes,
    Defined(String),
    I128,
    I16,
    I32,
    I64,
    I8,
    Option(Box<InstructionType>),
    Tuple(Vec<InstructionType>),
    PublicKey,
    pubkey,
    String,
    U128,
    U16,
    U32,
    U64,
    U8,
    Vec(Box<InstructionType>),
    HashMap(Box<InstructionType>, Box<InstructionType>),
    BTreeMap(Box<InstructionType>, Box<InstructionType>),
    HashSet(Box<InstructionType>),
    BTreeSet(Box<InstructionType>),
}

impl Default for InstructionType {
    fn default() -> Self {
        InstructionType::String
    }
}

#[derive(Deserialize, Serialize, Debug, Clone)]
#[serde(untagged)]
pub enum InstructionTypeVec {
    String(String),
    defined(Defined),
    vec(Vec_),
    u128(u128),
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Defined {
    pub(crate) defined: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Vec_ {
    pub(crate) vec: VecEnum,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
#[serde(untagged)]
pub enum VecEnum {
    String(String),
    defined(Defined),
}

impl Default for VecEnum {
    fn default() -> Self {
        VecEnum::String("".to_string())
    }
    
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct OptionType {
    pub(crate) option: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Name {
    pub(crate) name: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TypeFields {
    pub(crate) name: String,
    #[serde(default)]
    #[serde(rename = "type")]
    pub(crate) kind: InstructionType,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct Metadata {
    pub address: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum Content {
    String(String),
    Vec(Vec<u8>),
}
