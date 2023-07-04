use soda_sol::structs::IDL;
use walkdir::WalkDir;

pub fn load_idl(idl_path: &str) -> Result<IDL, Box<dyn std::error::Error>> {
    let idl = serde_json::from_str::<IDL>(&std::fs::read_to_string(idl_path)?)?;
    Ok(idl)
}

#[test]
    fn load_idl_from_fs() {
        for idl_path in WalkDir::new("./tests/idls").into_iter().filter_map(|e| e.ok()).filter(|e| e.path().extension().unwrap_or_default() == "json") {
            println!("Loading IDL: {}", idl_path.path().to_str().unwrap());
            assert!(load_idl(idl_path.path().to_str().unwrap()).is_ok())
        }
    }