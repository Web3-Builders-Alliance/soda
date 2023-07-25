#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_snake_case, non_camel_case_types)]

use soda_sol::*;
use std::{io::Write, path::PathBuf, sync::Mutex};
use tauri::{CustomMenuItem, Menu, MenuItem, State, Submenu};
mod default_template;
use default_template::default_template;
mod generate;
use generate::generate;
mod generate_idl_file;
use generate_idl_file::generate_idl_file;
mod new_window;
use new_window::new_window;
mod update_base_folder_path;
use update_base_folder_path::update_base_folder_path;
mod update_template;
use update_template::update_template;
mod update_idl_string;
use update_idl_string::update_idl_string;
mod generate_template_file;
use generate_template_file::generate_template_file;
mod error;
use error::Error;

#[derive(Debug)]
struct StateStruct {
    base_folder: String,
    template: Template,
    idl_string: String,
}

#[derive(Debug)]
pub struct AppState(Mutex<StateStruct>);

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let open_idl = CustomMenuItem::new("open_idl".to_string(), "Open IDL File");
    let generate_idl = CustomMenuItem::new("generate_idl".to_string(), "Save IDL File");
    let generate_project =
        CustomMenuItem::new("generate_project".to_string(), "Generate Project's Files");
    let new_project = CustomMenuItem::new("new_project".to_string(), "New IDL");
    let change_template = CustomMenuItem::new("change_template".to_string(), "Select Template");
    let template_from_folder =
        CustomMenuItem::new("template_from_folder".to_string(), "Open a template Folder");
    let save_template_file =
        CustomMenuItem::new("save_template_file".to_string(), "Save Template File");
    let about = CustomMenuItem::new("about".to_string(), "About");
    let submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(open_idl)
            .add_item(new_project)
            .add_item(generate_idl)
            .add_item(change_template)
            .add_item(generate_project)
            .add_item(template_from_folder)
            .add_item(save_template_file)
            .add_item(about)
            .add_item(quit),
    );

    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    tauri::Builder::default()
        .manage(AppState(Mutex::new(
            StateStruct {
                base_folder: ".".to_string(),
                template: default_template(),
                idl_string: r#"{"version":"0.1.0","name":"Project's Name","instructions":[{"name":"initialize","accounts":[],"args":[]}],"accounts":[],"types":[],"events":[],"errors":[],"metadata":{"address":""}}"#.to_string(),
            }
        )))
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "open_idl" => {
                event
                    .window()
                    .emit("open_idl", Some("open_idl".to_string()))
                    .unwrap();
            }
            "new_project" => {
                event
                    .window()
                    .emit("new_project", Some("new_project".to_string()))
                    .unwrap();
            }
            "generate_project" => {
                event
                    .window()
                    .emit("generate_project", Some("generate_project".to_string()))
                    .unwrap();
            }
            "generate_idl" => {
                event
                    .window()
                    .emit("generate_idl", Some("generate_idl".to_string()))
                    .unwrap();
            }
            "change_template" => {
                event
                    .window()
                    .emit("change_template", Some("change_template".to_string()))
                    .unwrap();
            }
            "template_from_folder" => {
                event
                    .window()
                    .emit("template_from_folder", Some("template_from_folder".to_string()))
                    .unwrap();
            }
            "save_template_file" => {
                event
                    .window()
                    .emit("save_template_file", Some("save_template_file".to_string()))
                    .unwrap();
            }
            "about" => {
                event
                    .window()
                    .emit("about", Some("about".to_string()))
                    .unwrap();
            }
            _ => {
                std::process::exit(0);
            }
        })
        .invoke_handler(tauri::generate_handler![
            generate,
            generate_idl_file,
            update_base_folder_path,
            new_window,
            update_template,
            update_idl_string,
            generate_template_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
