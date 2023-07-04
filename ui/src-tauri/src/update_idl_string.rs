use crate::{AppState, State};

#[tauri::command]
pub fn update_idl_string(idl: String, state: State<AppState>) -> Result<(), ()> {
    let mut state = state.0.lock().unwrap();
    state.idl_string = idl;
    Ok(())
}
