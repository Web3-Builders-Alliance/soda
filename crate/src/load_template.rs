use crate::{MyError, Template};
use bincode::deserialize;
use std::fs::read;

pub fn load_template(path: &str) -> Result<Template, MyError> {
    deserialize(&read(path)?)?
}
