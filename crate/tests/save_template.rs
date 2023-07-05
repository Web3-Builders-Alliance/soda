use soda_sol::{save_template, Template, TemplateMetadata, TemplateFile, Content, TemplateHelper};

#[test]
fn create_a_template_file() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![],
                helpers: vec![],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}



#[test]
fn create_a_template_file_with_files() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![TemplateFile {
                    path: "test".to_string(),
                    content: Content::String("test".to_string())
                }],
                helpers: vec![],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}

#[test]
fn create_a_template_file_with_helpers() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![],
                helpers: vec![TemplateHelper {
                    helper_name: "test".to_string(),
                    script: "test".to_string()
                }],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}

#[test]
fn create_a_template_file_with_helpers_and_files() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![TemplateFile {
                    path: "test".to_string(),
                    content: Content::String("test".to_string())
                }],
                helpers: vec![TemplateHelper {
                    helper_name: "test".to_string(),
                    script: "test".to_string()
                }],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}

#[test]
fn create_a_template_file_with_metadata() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![],
                helpers: vec![],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}

#[test]
fn create_a_template_file_with_metadata_and_files() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![TemplateFile {
                    path: "test".to_string(),
                    content: Content::String("test".to_string())
                }],
                helpers: vec![],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}

#[test]
fn create_a_template_file_with_metadata_and_helpers() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![],
                helpers: vec![TemplateHelper {
                    helper_name: "test".to_string(),
                    script: "test".to_string()
                }],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}

#[test]
fn create_a_template_file_with_metadata_helpers_and_files() {
    let  metadata = TemplateMetadata {name:"test".to_string(),description:"test".to_string(), version:  "".to_string(), authors:  "".to_string(), image:  "".to_string(), tags:  "".to_string() };

    assert_eq!(
        save_template(
            Template {
                files: vec![TemplateFile {
                    path: "test".to_string(),
                    content: Content::String("test".to_string())
                }],
                helpers: vec![TemplateHelper {
                    helper_name: "test".to_string(),
                    script: "test".to_string()
                }],
                metadata
        },
        "./tests/test.soda"
        ).unwrap(),
        ()
    )
}
