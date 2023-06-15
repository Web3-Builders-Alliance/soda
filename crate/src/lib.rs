#![allow(non_snake_case, non_camel_case_types)]

use std::fs::{create_dir_all, File};
use walkdir::WalkDir;
mod helpers;
pub mod structs;
use helpers::{apply_user_helpers, create_handlebars_registry};
pub use structs::{Data,IDL};

pub fn generate_from_idl(base_path: &str, idl: IDL, template_path: &str) {
    let mut handlebars = create_handlebars_registry();
    apply_user_helpers(template_path, &mut handlebars);
    let mut files = vec![];
    for entry in WalkDir::new(format!("{}/files/", template_path)) {
        let entry = entry.unwrap();
        let path = format!("{}", entry.path().display());
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
                        let new_paths = handlebars.render_template(&expresion, &idl);
                        let new_paths_unwrapped = new_paths.unwrap();
                        let mut new_paths_with_template: Vec<(String, String, Vec<String>)> =
                            (new_paths_unwrapped)
                                .split(',')
                                .map(|middle_part| {
                                    (
                                        format!("{}{}{}", prev_part, middle_part, last_part),
                                        path.clone(),
                                        [middle_part.to_string()].to_vec(),
                                    )
                                })
                                .collect();

                        files.append(&mut new_paths_with_template);
                    }
                }
            } else {
                println!(
                    "WARN: skipping {} open and clossing #each doesn't match",
                    path
                )
            }
        } else {
            files.push((path.clone(), path, [].to_vec()));
        }
    }
    let mut data: Data = idl.into();

    for (path, template, path_replacements) in files {
        data.path_replacements = path_replacements;
        let rel_path = path.get(template_path.len() + 6..path.len()).unwrap();
        if path.split('.').last().unwrap() == "hbs" {
            let file_path = handlebars
                .render_template(rel_path.get(0..rel_path.len() - 4).unwrap(), &data)
                .unwrap();
            handlebars
                .register_template_file("template", template)
                .unwrap();
            let mut output_lib_file = File::create(format!("{}/{}/{}", base_path, &data.name, file_path)).unwrap();
            handlebars
                .render_to_write("template", &data, &mut output_lib_file)
                .unwrap();
        } else {
            let dir_path = handlebars.render_template(rel_path, &data).unwrap();
            create_dir_all(format!("{}/{}/{}", base_path, &data.name, dir_path)).unwrap();
        };
    }
}
