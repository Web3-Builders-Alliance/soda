use crate::structs;
use handlebars::{handlebars_helper, Handlebars};
use structs::{InstructionType, InstructionTypeVec, TemplateHelper, VecEnum, IDL};

pub(crate) fn create_handlebars_registry() -> Handlebars<'static> {
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
            if passcalcaseChars.is_empty() {
                "".to_string()
            } else {
            let first: Vec<char> = passcalcaseChars[0].to_uppercase().to_string().chars().collect();
            passcalcaseChars[0] = *first.first().unwrap();
            let passcalcase: String = passcalcaseChars.into_iter().collect();
            passcalcase
            }
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
    handlebars
}

pub fn apply_user_helpers(helpers: Vec<TemplateHelper>, handlebars: &mut handlebars::Handlebars) {
    for TemplateHelper {
        helper_name,
        script,
    } in helpers
    {
        handlebars
            .register_script_helper(&helper_name, &script)
            .unwrap();
    }
}
