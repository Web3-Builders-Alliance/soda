use crate::{Error, Template};
use bincode::serialize;
use std::io::Write;

pub fn save_template(template: Template, path: &str) -> Result<(), Error> {
    let mut file = std::fs::File::create(path)?;
    Ok(file.write_all(&serialize(&template)?)?)
}
