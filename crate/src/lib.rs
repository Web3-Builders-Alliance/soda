#![allow(non_snake_case, non_camel_case_types)]

use std::{
    f32::consts::E,
    fmt::Error,
    fs::{create_dir_all, read, read_to_string, File},
    io::Write,
    path::PathBuf,
};
use walkdir::WalkDir;
mod helpers;
pub mod structs;
use bincode::{deserialize, serialize};
use helpers::{apply_user_helpers, create_handlebars_registry};
pub use structs::{Content, Data, Template, TemplateFile, TemplateHelper, TemplateMetadata, IDL};

pub fn generate_from_idl(base_path: &str, idl: IDL, template_path: &str) -> Result<(), Error> {
    if PathBuf::from(template_path).is_file() {
        match load_template(template_path) {
            Ok(template) => {
                let dinamyc_files = generate_project(template, &idl);
                write_project_to_fs(dinamyc_files, base_path);
                Ok(())
            }
            Err(err) => Err(Error),
        }
    } else {
        match get_template_from_fs(template_path) {
            Ok(template) => {
                let dinamyc_files = generate_project(template, &idl);
                write_project_to_fs(dinamyc_files, base_path);
                Ok(())
            }
            Err(err) => Err(Error),
        }
    }
}

pub fn write_project_to_fs(dinamyc_files: Vec<TemplateFile>, base_path: &str) -> Result<(), Error> {
    for TemplateFile { path, content } in dinamyc_files {
        let path_with_base = format!("{}/{}", base_path, path);
        let prefix = std::path::Path::new(&path_with_base).parent().unwrap();
        match create_dir_all(prefix) {
            Ok(_) => {
                match File::create(path_with_base) {
                    Ok(mut file) => {
                        match content {
                            Content::String(content) => {
                                match file.write_all(content.as_bytes()) {
                                    Ok(_) => {}
                                    Err(err) => return Err(Error),
                                }
                            }
                            Content::Vec(content) => {
                                match file.write_all(&content) {
                                    Ok(_) => {}
                                    Err(err) => return Err(Error),
                                }
                            }
                        }
                    }
                    Err(err) => return Err(Error),
                }
                
            }
            Err(err) => return Err(Error),
        }
    }
    Ok(())
}

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
                        structs::Content::String(read_to_string(path.clone()).unwrap())
                    } else {
                        structs::Content::Vec(read(path.clone()).unwrap())
                    };

                    files.push(TemplateFile {
                        path: path
                            .get(template_path.len() + 6..path.len())
                            .unwrap()
                            .to_string(),
                        content,
                    });
                }
            }

            Err(err) => return Err(Error),
        }
    }
    let mut helpers = vec![];
    for entry in WalkDir::new(format!("{}/helpers/", template_path)) {
        match entry {
            Ok(val) => {
                let path = format!("{}", val.path().to_string_lossy());
                let is_file = PathBuf::from(&path).is_file();
                if is_file {
                    let script = read_to_string(val.path()).unwrap();
                    let helper_name = path
                        .get(0..path.len() - 5)
                        .unwrap()
                        .split('/')
                        .last()
                        .unwrap()
                        .to_string();
                    helpers.push(TemplateHelper {
                        helper_name,
                        script,
                    });
                }
            }
            Err(err) => return Err(Error),
        }
    }
    let metadata = if PathBuf::from(format!("{}/metadata.json", template_path)).is_file() {
        match read_to_string(format!("{}/metadata.json", template_path)) {
            Ok(val) => match serde_json::from_str(&val) {
                Ok(decoded) => decoded,
                Err(err) => TemplateMetadata::default(),
            },
            Err(err) => TemplateMetadata::default(),
        }
    } else {
        TemplateMetadata::default()
    };
    Ok(Template {
        files,
        helpers,
        metadata,
    })
}

pub fn generate_project(template: Template, idl: &IDL) -> Vec<TemplateFile> {
    let Template { files, helpers, .. } = template;
    let mut handlebars = create_handlebars_registry();
    apply_user_helpers(helpers, &mut handlebars);
    let mut data: Data = idl.clone().into();
    let mut dinamic_files = vec![];
    for TemplateFile { path, content } in files {
        if path.contains("{{#each") {
            let breaks: Vec<(usize, &str)> = path.match_indices("{{#each").collect();
            if breaks.len() % 2 == 0 {
                let resultant: Vec<(usize, &(usize, &str))> = breaks.iter().enumerate().collect();
                for (index, (break_index, _)) in resultant {
                    if index % 2 == 0 && breaks.len() > index + 1 {
                        let (close_index, _) = breaks[index + 1];
                        let (rest, last_part) = path.split_at(close_index + 9);
                        let (prev_part, exp) = rest.split_at(*break_index);
                        let expresion_whithout_last: String =
                            exp.get(0..exp.len() - 9).unwrap().to_string();
                        let expresion = format!("{},{}", expresion_whithout_last, "{{/each}}");
                        let new_paths = handlebars.render_template(&expresion, idl);
                        let new_paths_unwrapped = new_paths.unwrap();
                        let mut new_paths_with_template: Vec<(String, Content, Vec<String>)> =
                            (new_paths_unwrapped)
                                .split(',')
                                .map(|middle_part| {
                                    (
                                        format!("{}{}{}", prev_part, middle_part, last_part),
                                        content.clone(),
                                        [middle_part.to_string()].to_vec(),
                                    )
                                })
                                .collect();
                        new_paths_with_template.pop();
                        dinamic_files.append(&mut new_paths_with_template);
                    }
                }
            } else {
                println!(
                    "WARN: skipping {} open and clossing #each doesn't match",
                    path
                )
            }
        } else {
            dinamic_files.push((path.clone(), content.clone(), [].to_vec()));
        }
    }
    let mut project: Vec<TemplateFile> = vec![];
    for (path, template, path_replacements) in dinamic_files {
        data.path_replacements = path_replacements;
        let file_path = if PathBuf::from(&path)
            .extension()
            .is_some_and(|ext| ext == "hbs")
        {
            handlebars
                .render_template(path.get(0..path.len() - 4).unwrap(), &data)
                .unwrap()
        } else {
            handlebars.render_template(&path, &data).unwrap()
        };
        let content: Content = match template {
            Content::String(content) => {
                structs::Content::String(handlebars.render_template(&content, &data).unwrap())
            }
            Content::Vec(content) => structs::Content::Vec(content),
        };

        project.push(TemplateFile {
            path: format!("/{}{}", &data.name, file_path),
            content,
        })
    }
    project
}

pub fn save_template(template: Template, path: &str) -> Result<(), Error> {
    match std::fs::File::create(path) {
        Ok(mut file) => {
            match serialize(&template) {
                Ok(encoded) => {
                    match file.write_all(&encoded) {
                        Err(err) => return Err(Error),
                        Ok(_) => Ok(()),
                    }
                }
                Err(err) => return Err(Error),
            }
        }
        Err(err) => return Err(Error),
    }
}

pub fn load_template(path: &str) -> Result<Template, Error> {
    match &read(path) {
        Ok(val) => match deserialize(val) {
            Ok(decoded) => Ok(decoded),
            Err(err) => Err(Error),
        },
        Err(err) => Err(Error),
    }
}
