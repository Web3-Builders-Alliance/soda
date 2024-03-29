use std::time::{SystemTime, UNIX_EPOCH};
use crate::*;

#[tauri::command]
pub async fn new_window(handle: tauri::AppHandle, target: &str) -> Result<(), Error> {
    tauri::WindowBuilder::new(&handle, format!("{}{}", target, SystemTime::now().duration_since(UNIX_EPOCH)?.subsec_nanos()), tauri::WindowUrl::App(target.into()))
        .title(target)
        .inner_size(800.0, 700.0)
        .build()?;
    Ok(())
}
