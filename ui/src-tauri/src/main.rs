#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_snake_case, non_camel_case_types)]
use soda::{generate_from_idl, IDL};
use std::{io::Write, sync::Mutex};
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, State};

#[derive(Debug)]
struct StateStruct {
    base_folder: String,
    template_folder: String,
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
    let about = CustomMenuItem::new("about".to_string(), "About");
    let submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(open_idl)
            .add_item(new_project)
            .add_item(generate_idl)
            .add_item(change_template)
            .add_item(generate_project)
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
                template_folder: ".".to_string(),
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
            update_template_folder_path,
            update_idl_string,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn generate(handle: tauri::AppHandle, state: State<AppState>) -> () {
    let (idl_string, base_folder, template_folder) = {
        let state = state.0.lock().unwrap();
        (
            &state.idl_string.clone(),
            &state.base_folder.clone(),
            &state.template_folder.clone(),
        )
    };
    let idl: IDL = serde_json::from_str(idl_string).expect("error while reading json");
    generate_from_idl(base_folder, idl, template_folder);
}

#[tauri::command]
fn generate_idl_file(handle: tauri::AppHandle, baseFolder: &str, idl: &str) -> () {
    let idl: IDL = serde_json::from_str(idl).expect("error while reading json");
    let mut file = std::fs::File::create(format!("{}/idl.json", baseFolder)).unwrap();
    file.write_all(serde_json::to_string_pretty(&idl).unwrap().as_bytes())
        .unwrap();
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
fn update_template_folder_path(template: String, state: State<AppState>) -> Result<(), ()> {
    let mut state = state.0.lock().unwrap();
    state.template_folder = template;
    Ok(())
}

#[tauri::command]
fn update_idl_string(idl: String, state: State<AppState>) -> Result<(), ()> {
    let mut state = state.0.lock().unwrap();
    state.idl_string = idl;
    Ok(())
}