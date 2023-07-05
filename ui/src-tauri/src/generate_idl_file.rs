use crate::*;

#[tauri::command]
pub fn generate_idl_file(state: State<AppState>) -> Result<(), Error> {
    let (idl_string, base_folder) = {
        let state = state.0.lock()?;
        (&state.idl_string.clone(), &state.base_folder.clone())
    };
    match std::fs::File::create(format!("{}/idl.json", base_folder)) {
        Ok(mut file) => match file.write_all(idl_string.as_bytes()) {
            Ok(_) => Ok(()),
            Err(e) => Err(Error::CustomError {
                message: e.to_string(),
            }),
        },
        Err(e) => Err(Error::CustomError {
            message: e.to_string(),
        }),
    }
}
