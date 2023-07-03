use crate::*;
use std::path::PathBuf;

pub fn generate_from_idl(base_path: &str, idl: IDL, template_path: &str) -> Result<(), MyError> {
    let template = if PathBuf::from(template_path).is_file() {
        load_template(template_path)?
    } else {
        get_template_from_fs(template_path)?
    };
    let dinamyc_files = generate_project(template, &idl)?;
    write_project_to_fs(dinamyc_files, base_path)
}
