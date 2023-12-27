use crate::{Content, Error, Template, TemplateFile, TemplateHelper, TemplateMetadata};
use std::{
    fs::{read, read_to_string},
    path::PathBuf,
};
use walkdir::WalkDir;

// Get a template from the filesystem and return a Template struct
pub fn get_template_from_fs(template_path: &str) -> Result<Template, Error> {
    let mut files = vec![];
    for entry in WalkDir::new(format!("{}/files/", template_path)) {
        match entry {
            Ok(val) => {
                let path = &format!("{}", val.path().display());
                let is_file = PathBuf::from(path).is_file();
                if is_file {
                    let content: Content = if PathBuf::from(path)
                        .extension()
                        .is_some_and(|ext| ext == "hbs")
                    {
                        Content::String(read_to_string(path.clone())?)
                    } else {
                        Content::Vec(read(path.clone())?)
                    };

                    files.push(TemplateFile {
                        path: path
                            .get(template_path.len() + 6..path.len())
                            .unwrap_or("")
                            .to_string(),
                        content,
                    });
                }
            }
            Err(err) => {
                return Err(Error::CustomError {
                    message: err.to_string(),
                })
            }
        }
    }
    let mut helpers = vec![];
    for entry in WalkDir::new(format!("{}/helpers/", template_path)) {
        match entry {
            Ok(val) => {
                let path = format!("{}", val.path().to_string_lossy());
                let is_file = PathBuf::from(&path).is_file();
                if is_file {
                    let script = read_to_string(val.path())?;
                    let helper_name = path
                        .get(0..path.len() - 5)
                        .unwrap_or("")
                        .split('/')
                        .last()
                        .unwrap_or("")
                        .to_string();
                    helpers.push(TemplateHelper {
                        helper_name,
                        script,
                    });
                }
            }
            Err(err) => {
                return Err(Error::CustomError {
                    message: err.to_string(),
                })
            }
        }
    }
    let metadata_path = format!("{}/metadata.json", template_path);
    let metadata = if PathBuf::from(&metadata_path).is_file() {
        serde_json::from_str(&read_to_string(metadata_path)?)?
    } else {
        TemplateMetadata::default()
    };
    Ok(Template {
        files,
        helpers,
        metadata,
    })
}
