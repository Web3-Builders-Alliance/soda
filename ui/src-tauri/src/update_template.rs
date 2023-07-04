use crate::*;

#[tauri::command]
pub fn update_template(template_path: String, state: State<AppState>) -> Result<(), Error> {
    let mut state = state.0.lock()?;
    let template = if PathBuf::from(&template_path).is_file() {
        load_template(&template_path)?
    } else {
        get_template_from_fs(&template_path)?
    };
    state.template = template;
    Ok(())
}
