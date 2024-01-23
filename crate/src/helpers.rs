use crate::{structs, Error};
use handlebars::{handlebars_helper, Handlebars};
use structs::{InstructionType, TemplateHelper, IDL};

pub(crate) fn create_handlebars_registry() -> Handlebars<'static> {
    handlebars_helper!(snakecase: |name: String| name.chars().enumarate().fold(
            "".to_string(),
            |acc, (index, letter)| {
                if letter.is_uppercase() {
                    if index == 0 {
                        format!("{}{}", acc, letter.to_lowercase())
                    } else {
                        format!("{}_{}", acc, letter.to_lowercase())
                    }
                } else {
                    format!("{}{}", acc, letter)
                }
            }
        )
    );

    handlebars_helper!(pascalcase: |name: String|{
            let mut passcalcase_chars: Vec<char> = name.chars().collect();
            if passcalcase_chars.is_empty() {
                "".to_string()
            } else {
            let first: Vec<char> = passcalcase_chars[0].to_uppercase().to_string().chars().collect();
            passcalcase_chars[0] = *first.first().unwrap_or(&' ');
            let passcalcase: String = passcalcase_chars.into_iter().collect();
            passcalcase
            }
        }
    );

    handlebars_helper!(type_from_account_field: |account_field_type: InstructionType| type_from_account_field_impl(account_field_type));

    handlebars_helper!(debug_idl: |idl: IDL|serde_json::to_string(&idl).unwrap_or("".to_string()));

    let mut handlebars = Handlebars::new();

    handlebars.register_helper("snakecase", Box::new(snakecase));
    handlebars.register_helper("pascalcase", Box::new(pascalcase));
    handlebars.register_helper("type_from_account_field", Box::new(type_from_account_field));
    handlebars.register_helper("debug_idl", Box::new(debug_idl));
    handlebars
}

pub fn apply_user_helpers(
    helpers: Vec<TemplateHelper>,
    handlebars: &mut handlebars::Handlebars,
) -> Result<(), Error> {
    for TemplateHelper {
        helper_name,
        script,
    } in helpers
    {
        match handlebars.register_script_helper(&helper_name, &script) {
            Ok(_) => {}
            Err(err) => {
                return Err(Error::CustomError {
                    message: format!("Error registering helper: {}", err),
                })
            }
        }
    }
    Ok(())
}

fn type_from_account_field_impl(account_field_type:  InstructionType) -> String {
    match account_field_type {
        InstructionType::String => "String".to_string(),
        InstructionType::U8 => "u8".to_string(),
        InstructionType::U16 => "u16".to_string(),
        InstructionType::U32 => "u32".to_string(),
        InstructionType::U64 => "u64".to_string(),
        InstructionType::U128 => "u128".to_string(),
        InstructionType::Bool => "bool".to_string(),
        InstructionType::Vec(content) => format!("Vec<{}>", type_from_account_field_impl(*content)),
        InstructionType::Option(option) => format!("Option<{}>", type_from_account_field_impl(*option)),
        InstructionType::Defined(defined) => defined,
        InstructionType::Array(content, number) => format!("[{}; {}]", type_from_account_field_impl(*content), number),
        InstructionType::Bytes => "Vec<u8>".to_string(),
        InstructionType::I128 => "i128".to_string(),
        InstructionType::I16 => "i16".to_string(),
        InstructionType::I32 => "i32".to_string(),
        InstructionType::I64 => "i64".to_string(),
        InstructionType::I8 => "i8".to_string(),
        InstructionType::Tuple(content) => {
            let mut tuple = "(".to_string();
            for (i, inner_content) in content.iter().enumerate() {
                tuple.push_str(&type_from_account_field_impl(inner_content.clone()));
                if i < content.iter().len() - 1 {
                    tuple.push_str(", ");
                }
            }
            tuple.push_str(")");
            tuple
        }
        InstructionType::PublicKey => "Pubkey".to_string(),
        InstructionType::HashMap(content_a, content_b) => format!("HashMap<{}, {}>", type_from_account_field_impl(*content_a), type_from_account_field_impl(*content_b)),
        InstructionType::BTreeMap(content_a, content_b) => format!("BTreeMap<{}, {}>", type_from_account_field_impl(*content_a), type_from_account_field_impl(*content_b)),
        InstructionType::HashSet(content) => format!("HashSet<{}>", type_from_account_field_impl(*content)),
        InstructionType::BTreeSet(content) => format!("BTreeSet<{}>", type_from_account_field_impl(*content)),
    }    
}
