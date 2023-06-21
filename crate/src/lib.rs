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
pub use structs::{Content, Data, IDL};

pub fn generate_from_idl(base_path: &str, idl: IDL, template_path: &str) {
    let handlebars = create_handlebars_registry();
    let template = get_template_from_fs(template_path);
    let dinamyc_files = generate_project(template, &idl);
    for (path, is_dir, content) in dinamyc_files {
        if is_dir {
            let dir_path = handlebars.render_template(&path, &idl).unwrap();
            create_dir_all(format!("{}/{}", base_path, dir_path)).unwrap();
        } else {
            let file_path = handlebars.render_template(&path, &idl).unwrap();
            let mut output_lib_file = File::create(format!("{}/{}", base_path, file_path)).unwrap();
            match content {
                Content::String(content) => {
                    let content = handlebars.render_template(&content, &idl).unwrap();
                    output_lib_file.write_all(content.as_bytes()).unwrap();
                }
                Content::Vec(content) => {
                    output_lib_file.write_all(content.as_slice()).unwrap();
                }
            }
        };
    }
}

pub fn get_template_from_fs(
    template_path: &str,
) -> (Vec<(String, Content, bool)>, Vec<(String, String)>) {
    let mut files = vec![];
    for entry in WalkDir::new(format!("{}/files/", template_path)) {
        let entry = entry.unwrap();
        let path = &format!("{}", entry.path().display());
        let is_dir = PathBuf::from(path).is_dir();
        let template: Content = if is_dir {
            structs::Content::String("".to_string())
        } else {
            if PathBuf::from(path).extension().unwrap() == "hbs" {
                structs::Content::String(read_to_string(path.clone()).unwrap())
            } else {
                structs::Content::Vec(read(path.clone()).unwrap())
            }
        };
        files.push((
            path.get(template_path.len() + 6..path.len())
                .unwrap()
                .to_string(),
            template,
            is_dir,
        ));
    }
    let mut helpers = vec![];
    for entry in WalkDir::new(format!("{}/helpers/", template_path)) {
        match entry {
            Ok(val) => {
                let path = format!("{}", val.path().to_string_lossy());
                if path.split('.').count() > 1 {
                    let script = read_to_string(val.path()).unwrap();
                    let helper_name = path
                        .get(0..path.len() - 5)
                        .unwrap()
                        .split('/')
                        .last()
                        .unwrap()
                        .to_string();
                    helpers.push((helper_name, script));
                }
            }
            Err(err) => println!("{}", err),
        }
    }
    (files, helpers)
}

pub fn generate_project(
    template: (Vec<(String, Content, bool)>, Vec<(String, String)>),
    idl: &IDL,
) -> Vec<(String, bool, Content)> {
    let (files, helpers) = template;
    let mut handlebars = create_handlebars_registry();
    apply_user_helpers(helpers, &mut handlebars);
    let mut data: Data = idl.clone().into();
    let mut dinamic_files = vec![];
    for (path, template, is_dir) in files {
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
                        let mut new_paths_with_template: Vec<(String, Content, bool, Vec<String>)> =
                            (new_paths_unwrapped)
                                .split(',')
                                .map(|middle_part| {
                                    (
                                        format!("{}{}{}", prev_part, middle_part, last_part),
                                        template.clone(),
                                        is_dir,
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
            dinamic_files.push((path.clone(), template.clone(), is_dir, [].to_vec()));
        }
    }
    let mut project: Vec<(String, bool, Content)> = vec![];
    for (path, template, is_dir, path_replacements) in dinamic_files {
        data.path_replacements = path_replacements;
        if is_dir {
            let dir_path = handlebars.render_template(&path, &data).unwrap();
            project.push((
                format!("{}/{}", &data.name, dir_path),
                is_dir,
                structs::Content::String("".to_string()),
            ))
        } else {
            let file_path = if PathBuf::from(&path).extension().unwrap() == "hbs" {
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

            project.push((format!("{}/{}", &data.name, file_path), is_dir, content))
        };
    }
    project
}
