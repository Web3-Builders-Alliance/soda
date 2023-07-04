use std::sync::{PoisonError, MutexGuard};

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("soda_sol crate error: {message}")]
    CustomError { message: String },
}
#[derive(serde::Serialize, serde::Deserialize)]
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

impl<'de> serde::Deserialize<'de> for Error {
    fn deserialize<D>(deserializer: D) -> Result<Error, D::Error>
    where
        D: serde::de::Deserializer<'de>,
    {
        let wrapper = ErrorWrapper::deserialize(deserializer)?;
        Ok(Error::CustomError {
            message: wrapper.error,
        })
    }
}

impl From<bincode::Error> for Error {
    fn from(err: bincode::Error) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<std::io::Error> for Error {
    fn from(err: std::io::Error) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<Result<(), std::io::Error>> for Error {
    fn from(err: Result<(), std::io::Error>) -> Error {
        match err {
            Ok(_) => Error::CustomError {
                message: "no error".to_string(),
            },
            Err(err) => Error::CustomError {
                message: err.to_string(),
            },
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

impl From<handlebars::RenderError> for Error {
    fn from(err: handlebars::RenderError) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}

impl<T> From<PoisonError<MutexGuard<'_, T>>> for Error {
    fn from(err: PoisonError<MutexGuard<'_, T>>) -> Error {
        Error::CustomError {
            message: err.to_string(),
        }
    }
}
