#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_snake_case, non_camel_case_types)]
use soda::{generate_from_idl, IDL};
use std::io::Write;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let open_idl = CustomMenuItem::new("open_idl".to_string(), "Open IDL File");
    let generate_idl = CustomMenuItem::new("generate_idl".to_string(), "Save IDL File");
    let generate_project =
        CustomMenuItem::new("generate_project".to_string(), "Generate Project's Files");
    let new_project = CustomMenuItem::new("new_project".to_string(), "New Project");
    let change_template = CustomMenuItem::new("change_template".to_string(), "Select Template");
    let about = CustomMenuItem::new("about".to_string(), "About");
    let submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(open_idl)
            .add_item(new_project)
            .add_item(generate_project)
            .add_item(generate_idl)
            .add_item(change_template)
            .add_item(about)
            .add_item(quit),
    );
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    tauri::Builder::default()
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
            egg,
            show_about
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn generate(handle: tauri::AppHandle, baseFolder: &str, idl: &str, templateFolder: &str) -> () {
    let idl: IDL = serde_json::from_str(idl).expect("error while reading json");
    generate_from_idl(baseFolder, idl, templateFolder);
}

#[tauri::command]
fn generate_idl_file(handle: tauri::AppHandle, baseFolder: &str, idl: &str) -> () {
    let idl: IDL = serde_json::from_str(idl).expect("error while reading json");
    let mut file = std::fs::File::create(format!("{}/idl.json", baseFolder)).unwrap();
    file.write_all(serde_json::to_string_pretty(&idl).unwrap().as_bytes())
        .unwrap();
}

#[tauri::command]
async fn egg(handle: tauri::AppHandle) {
    tauri::WindowBuilder::new(&handle, "egg", tauri::WindowUrl::App("egg".into()))
        .title("Bubbles")
        .inner_size(800.0, 700.0)
        .position(0.0, 0.0)
        .build()
        .unwrap();
}

#[tauri::command]
async fn show_about(handle: tauri::AppHandle) {
    tauri::WindowBuilder::new(&handle, "about", tauri::WindowUrl::App("about".into()))
        .title("About")
        .inner_size(800.0, 700.0)
        .position(500.0, 0.0)
        .build()
        .unwrap();
}
