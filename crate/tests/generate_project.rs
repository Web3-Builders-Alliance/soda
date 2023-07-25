use soda_sol::{generate_project, structs::Metadata, Template, IDL};

fn empty_idl() -> IDL {
    IDL {
        name: "test".to_string(),
        version: "test".to_string(),
        instructions: vec![],
        accounts: vec![],
        types: vec![],
        events: vec![],
        errors: vec![],
        metadata: Metadata {
            address: "".to_string(),
        },
    }
}

fn empty_template() -> Template {
    Template {
        files: vec![],
        helpers: vec![],
        metadata: soda_sol::TemplateMetadata {
            name: "test".to_string(),
            description: "test".to_string(),
            version: "".to_string(),
            authors: "".to_string(),
            image: "".to_string(),
            tags: "".to_string(),
        },
    }
}

#[test]
fn generate_project_with_empty_template() {
    assert_eq!(
        generate_project(empty_template(), &empty_idl()).unwrap().len(),
        0
    )
}

#[test]
fn generate_project_with_empty_idl() {
    assert_eq!(
        generate_project(empty_template(), &empty_idl()).unwrap().len(),
        0
    )
}

#[test]
fn generate_from_fs() {
    let template = soda_sol::load_template("./tests/test.soda").unwrap();
    let idl_path = "./tests/idl.json";
    let idl = serde_json::from_str::<IDL>(&std::fs::read_to_string(idl_path).unwrap()).unwrap();

    assert!(generate_project(template, &idl).is_ok())
}
