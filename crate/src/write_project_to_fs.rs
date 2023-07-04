use crate::{Content, Error, TemplateFile};
use std::{
    fs::{create_dir_all, File},
    io::Write,
};

pub fn write_project_to_fs(dinamyc_files: Vec<TemplateFile>, base_path: &str) -> Result<(), Error> {
    for TemplateFile { path, content } in dinamyc_files {
        let path_with_base = format!("{}/{}", base_path, path);
        let prefix = std::path::Path::new(&path_with_base).parent().unwrap();
        create_dir_all(prefix)?;
        let mut file = File::create(path_with_base)?;
        match content {
            Content::String(content) => file.write_all(content.as_bytes())?,
            Content::Vec(content) => file.write_all(&content)?,
        };
    }
    Ok(())
}
