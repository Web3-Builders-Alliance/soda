use crate::{Error, Template};
use bincode::deserialize;
use std::fs::read;

/// Load a template from a .soda file and return a Template struct
pub fn load_template(path: &str) -> Result<Template, Error> {
    let bytes = read(path)?;
    let template: Template = deserialize(&bytes)?;
    Ok(template)
}
