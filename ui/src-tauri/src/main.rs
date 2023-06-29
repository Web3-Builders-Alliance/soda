#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_snake_case, non_camel_case_types)]

use serde;
use soda_sol::*;
use std::{io::Write, sync::Mutex, path::PathBuf};
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, State};
mod default_template;
use default_template::default_template;

#[derive(Debug)]
struct StateStruct {
    base_folder: String,
    template: Template,
    idl_string: String,
}

#[derive(Debug)]
struct AppState(Mutex<StateStruct>);

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
            .add_item(quit)
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

#[tauri::command]
fn generate(state: State<AppState>) -> Result<(), MyError> {
    let (idl_string, base_folder, template) = {
        let state = state.0.lock().unwrap();
        (
            &state.idl_string.clone(),
            &state.base_folder.clone(),
            &state.template.clone(),
        )
    };
    match serde_json::from_str::<IDL>(idl_string) {
        Ok(idl) => {
            let dinamyc_files = generate_project(template.clone(), &idl);
            match write_project_to_fs(dinamyc_files, base_folder) {
                Ok(_) => {},
                Err(e) => return Err(MyError::CustomError {
                    message: e.to_string(),
                }),
            };
            Ok(())
        }
        Err(e) => Err(MyError::CustomError {
            message: e.to_string(),
        }),
    }
}

#[tauri::command]
fn generate_idl_file(state: State<AppState>) -> Result<(), MyError> {
    let (idl_string, base_folder) = {
        let state = state.0.lock().unwrap();
        (
            &state.idl_string.clone(),
            &state.base_folder.clone(),
        )
    };
    match std::fs::File::create(format!("{}/idl.json", base_folder)) {
        Ok(mut file) => {
            match file.write_all(idl_string.as_bytes()) {
                Ok(_) => Ok(()),
                Err(e) => Err(MyError::CustomError {
                    message: e.to_string(),
                }),
            }
        }
        Err(e) => Err(MyError::CustomError {
            message: e.to_string(),
        }),
    }
}

#[tauri::command]
async fn new_window(handle: tauri::AppHandle, target: &str) -> Result<(), ()> {
    tauri::WindowBuilder::new(&handle, target, tauri::WindowUrl::App(target.into()))
        .title(target)
        .inner_size(800.0, 700.0)
        .build()
        .unwrap();
    Ok(())
}

#[tauri::command]
fn update_base_folder_path(base: String, state: State<AppState>) -> Result<(), ()> {
    let mut state = state.0.lock().unwrap();
    state.base_folder = base;
    Ok(())
}

#[tauri::command]
fn update_template(template_path: String, state: State<AppState>) -> Result<(), MyError> {
    let mut state = state.0.lock().unwrap();
    if PathBuf::from(&template_path).is_file() {
        match load_template(&template_path) {
            Ok(template) => {
                state.template = template;
                Ok(())
            }
            Err(err) => Err(MyError::CustomError {
                message: err.to_string(),
            }),
        }
    } else {
        match get_template_from_fs(&template_path) {
            Ok(template) => {
                state.template = template;
                Ok(())
            }
            Err(err) => Err(MyError::CustomError {
                message: err.to_string(),
            }),
        }
    }
}

#[tauri::command]
fn update_idl_string(idl: String, state: State<AppState>) -> Result<(), ()> {
    let mut state = state.0.lock().unwrap();
    state.idl_string = idl;
    Ok(())
}

#[derive(thiserror::Error, Debug)]
pub enum MyError {
    #[error("custom error: {message}")]
    CustomError { message: String },
}
#[derive(serde::Serialize)]
struct ErrorWrapper {
    error: String,
}
impl serde::Serialize for MyError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = match self {
            MyError::CustomError { message } => message,
        };
        let wrapper = ErrorWrapper {
            error: error_message.to_string(),
        };
        wrapper.serialize(serializer)
    }
}

#[tauri::command]
fn generate_template_file(path: String, state: State<AppState>) -> Result<(), MyError> {
    let state = state.0.lock().unwrap();
    match save_template(state.template.clone(), &path) {
        Ok(_) => Ok(()),
        Err(e) => Err(MyError::CustomError {
            message: e.to_string(),
        }),
    }
}
