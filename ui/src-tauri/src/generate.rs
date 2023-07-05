use crate::*;

#[tauri::command]
pub fn generate(state: State<AppState>) -> Result<(), Error> {
    let (idl_string, base_folder, template) = {
        let state = state.0.lock()?;
        (
            &state.idl_string.clone(),
            &state.base_folder.clone(),
            &state.template.clone(),
        )
    };
    let idl = serde_json::from_str::<IDL>(idl_string)?;
    let dinamyc_files = generate_project(template.clone(), &idl)?;
    write_project_to_fs(dinamyc_files, base_folder)?;
    Ok(())
}
