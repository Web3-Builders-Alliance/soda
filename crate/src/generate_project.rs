use std::path::PathBuf;

use crate::*;
use helpers::{apply_user_helpers, create_handlebars_registry};

pub fn generate_project(template: Template, idl: &IDL) -> Result<Vec<TemplateFile>, Error> {
    let Template { files, helpers, .. } = template;
    let mut handlebars = create_handlebars_registry();
    apply_user_helpers(helpers, &mut handlebars)?;
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
                            exp.get(0..exp.len() - 9).unwrap_or("").to_string();
                        let expresion = format!("{},{}", expresion_whithout_last, "{{/each}}");
                        let new_paths = handlebars.render_template(&expresion, idl)?;
                        let mut new_paths_with_template: Vec<(String, Content, Vec<String>)> =
                            (new_paths)
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
            handlebars.render_template(path.get(0..path.len() - 4).unwrap_or(""), &data)?
        } else {
            handlebars.render_template(&path, &data)?
        };
        let content: Content = match template {
            Content::String(content) => {
                structs::Content::String(handlebars.render_template(&content, &data)?)
            }
            Content::Vec(content) => structs::Content::Vec(content),
        };

        project.push(TemplateFile {
            path: format!("/{}{}", &data.name, file_path),
            content,
        })
    }
    Ok(project)
}
