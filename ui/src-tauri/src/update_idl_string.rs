use crate::{AppState, Error, State};

#[tauri::command]
pub fn update_idl_string(idl: String, state: State<AppState>) -> Result<(), Error> {
    let mut state = state.0.lock()?;
    state.idl_string = idl;
    Ok(())
}
