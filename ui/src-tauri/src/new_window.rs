use crate::*;

#[tauri::command]
pub async fn new_window(handle: tauri::AppHandle, target: &str) -> Result<(), Error> {
    tauri::WindowBuilder::new(&handle, target, tauri::WindowUrl::App(target.into()))
        .title(target)
        .inner_size(800.0, 700.0)
        .build()?;
    Ok(())
}
