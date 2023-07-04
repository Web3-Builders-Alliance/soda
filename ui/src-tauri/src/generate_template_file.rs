use crate::{save_template, AppState, Error, State};

#[tauri::command]
pub fn generate_template_file(path: String, state: State<AppState>) -> Result<(), Error> {
    let state = state.0.lock()?;
    save_template(state.template.clone(), &path)?;
    Ok(())
}
