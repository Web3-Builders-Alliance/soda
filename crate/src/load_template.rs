use crate::{Error, Template};
use bincode::deserialize;
use std::fs::read;

pub fn load_template(path: &str) -> Result<Template, Error> {
    let bytes = read(path)?;
    let template: Template = deserialize(&bytes)?;
    Ok(template)
}
