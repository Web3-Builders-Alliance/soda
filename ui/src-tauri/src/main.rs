#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(non_snake_case, non_camel_case_types)]

use soda::{generate_from_idl, IDL};
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let open_idl = CustomMenuItem::new("open_idl".to_string(), "Open IDL File");
    let generate_idl = CustomMenuItem::new("generate_idl".to_string(), "Save IDL File");
    let generate_project =
        CustomMenuItem::new("generate_project".to_string(), "Generate Project's Files");
    let new_project = CustomMenuItem::new("new_project".to_string(), "New Project");
    let change_template = CustomMenuItem::new("change_template".to_string(), "Select Template");
    let submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(open_idl)
            .add_item(new_project)
            .add_item(generate_project)
            .add_item(generate_idl)
            .add_item(change_template)
            .add_item(quit)
            .add_item(close),
    );
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            "open_idl" => {}
            "new_project" => {}
            "generate_project" => {}
            "generate_idl" => {}
            "change_template" => {}
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![generate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn generate(handle: tauri::AppHandle, baseFolder: &str, idl: &str, templateFolder: &str) -> String {
    let idl: IDL = serde_json::from_str(idl).expect("error while reading json");
    generate_from_idl(baseFolder, idl, templateFolder);
    format!("Project Generated!")
}
