#[derive(thiserror::Error, Debug)]
pub enum MyError {
    #[error("soda_sol crate error: {message}")]
    CustomError { message: String },
}
#[derive(serde::Serialize, serde::Deserialize)]
struct ErrorWrapper {
    error: String,
}
impl serde::Serialize for MyError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = match self {
            MyError::CustomError { message } => message,
        };
        let wrapper = ErrorWrapper {
            error: error_message.to_string(),
        };
        wrapper.serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for MyError {
    fn deserialize<D>(deserializer: D) -> Result<MyError, D::Error>
    where
        D: serde::de::Deserializer<'de>,
    {
        let wrapper = ErrorWrapper::deserialize(deserializer)?;
        Ok(MyError::CustomError {
            message: wrapper.error,
        })
    }
}

impl From<bincode::Error> for MyError {
    fn from(err: bincode::Error) -> MyError {
        MyError::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<std::io::Error> for MyError {
    fn from(err: std::io::Error) -> MyError {
        MyError::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<Result<(), std::io::Error>> for MyError {
    fn from(err: Result<(), std::io::Error>) -> MyError {
        match err {
            Ok(_) => MyError::CustomError {
                message: "no error".to_string(),
            },
            Err(err) => MyError::CustomError {
                message: err.to_string(),
            },
        }
    }
}

impl From<serde_json::Error> for MyError {
    fn from(err: serde_json::Error) -> MyError {
        MyError::CustomError {
            message: err.to_string(),
        }
    }
}

impl From<handlebars::RenderError> for MyError {
    fn from(err: handlebars::RenderError) -> MyError {
        MyError::CustomError {
            message: err.to_string(),
        }
    }
}
