use crate::*;

#[tauri::command]
pub fn update_template(template_path: String, state: State<AppState>) -> Result<(), Error> {
    let mut state = state.0.lock().unwrap();
    if PathBuf::from(&template_path).is_file() {
        match load_template(&template_path) {
            Ok(template) => {
                state.template = template;
                Ok(())
            }
            Err(err) => Err(Error::CustomError {
                message: err.to_string(),
            }),
        }
    } else {
        match get_template_from_fs(&template_path) {
            Ok(template) => {
                state.template = template;
                Ok(())
            }
            Err(err) => Err(Error::CustomError {
                message: err.to_string(),
            }),
        }
    }
}
