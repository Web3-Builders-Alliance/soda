#![allow(non_snake_case, non_camel_case_types)]

use std::{
    fs::{create_dir_all, read, read_to_string, File},
    io::Write,
    path::PathBuf,
};
use walkdir::WalkDir;
mod helpers;
pub mod structs;
use helpers::{apply_user_helpers, create_handlebars_registry};
pub use structs::{Content, Data, Template, TemplateFile, TemplateHelper, IDL};
use bincode::{serialize, deserialize};

pub fn generate_from_idl(base_path: &str, idl: IDL, template_path: &str) {
    let template = if PathBuf::from(template_path).is_file() {
        load_template(template_path)
    } else {
        get_template_from_fs(template_path)
    };
    let dinamyc_files = generate_project(template, &idl);
    write_project_to_fs(dinamyc_files, base_path);
}

pub fn write_project_to_fs(dinamyc_files: Vec<TemplateFile>, base_path: &str) {
    for TemplateFile { path, content } in dinamyc_files {
        let path_with_base = format!("{}/{}", base_path, path);
        let prefix = std::path::Path::new(&path_with_base).parent().unwrap();
        create_dir_all(prefix).unwrap();
        let mut output_lib_file = File::create(path_with_base).unwrap();
        match content {
            Content::String(content) => {
                output_lib_file.write_all(content.as_bytes()).unwrap();
            }
            Content::Vec(content) => {
                output_lib_file.write_all(content.as_slice()).unwrap();
            }
        }
    }
}

pub fn get_template_from_fs(template_path: &str) -> Template {
    let mut files = vec![];
    for entry in WalkDir::new(format!("{}/files/", template_path)) {
        let entry = entry.unwrap();
        let path = &format!("{}", entry.path().display());
        let is_file = PathBuf::from(path).is_file();
        if is_file {
            let content: Content = if PathBuf::from(path).extension().is_some_and(|ext| ext == "hbs")  {
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
            Err(err) => println!("{}", err),
        }
    }
    Template { files, helpers }
}

pub fn generate_project(template: Template, idl: &IDL) -> Vec<TemplateFile> {
    let Template { files, helpers } = template;
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
        let file_path = if PathBuf::from(&path).extension().is_some_and(|ext| ext == "hbs"){
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

pub fn save_template(template: Template, path: &str) {
    let mut file = std::fs::File::create(path).unwrap();
    let encoded: Vec<u8> = serialize(&template).unwrap();
    file.write_all(&encoded).unwrap();
}

pub fn load_template(path: &str) -> Template {
    let decoded: Template = deserialize(&read(path).unwrap()).unwrap();
    decoded
}
