use crate::{AppState, State};

#[tauri::command]
pub fn update_base_folder_path(base: String, state: State<AppState>) -> Result<(), ()> {
    let mut state = state.0.lock().unwrap();
    state.base_folder = base;
    Ok(())
}
