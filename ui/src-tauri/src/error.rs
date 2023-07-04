use std::sync::{MutexGuard, PoisonError};

use crate::StateStruct;

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("custom error: {message}")]
    CustomError { message: String },
}

#[derive(serde::Serialize)]
struct ErrorWrapper {
    error: String,
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = match self {
            Error::CustomError { message } => message,
        };
        let wrapper = ErrorWrapper {
            error: error_message.to_string(),
        };
        wrapper.serialize(serializer)
    }
}

impl From<soda_sol::error::Error> for Error {
    fn from(err: soda_sol::Error) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<PoisonError<MutexGuard<'_, StateStruct>>> for Error {
    fn from(err: PoisonError<MutexGuard<'_, StateStruct>>) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<serde_json::Error> for Error {
    fn from(err: serde_json::Error) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<tauri::Error> for Error {
    fn from(err: tauri::Error) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}
