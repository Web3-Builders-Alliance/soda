use crate::{AppState, Error, State};

#[tauri::command]
pub fn update_base_folder_path(base: String, state: State<AppState>) -> Result<(), Error> {
    let mut state = state.0.lock()?;
    state.base_folder = base;
    Ok(())
}
