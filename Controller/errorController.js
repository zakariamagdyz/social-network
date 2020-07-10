const HttpError = require("../Utils/HttpError");

const handleCastError = (err) => {
  const message = `invalid ${err.path} :${err.value}`;
  return new HttpError(message, 400);
};

const handleDuplicateError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `invalid duplicate ${value}, Please use another value`;

  return new HttpError(message, 400);
};

const handleValidateError = (err) => {
  const values = Object.values(err.errors).map((err) => err.message);
  const message = `invalid data ${values.join(", ").replace(/Path/g, "")}`;

  return new HttpError(message, 400);
};

const handleJsonWebTokenError = () => {
  return new HttpError("invalid token, Please log in again", 401);
};

const handleExpiredTokenError = () => {
  return new HttpError("expired token, Please log in again", 401);
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    if (err.name === "CastError") error = handleCastError(err);
    if (err.name === "ValidationError") error = handleValidateError(err);
    if (err.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (err.name === "TokenExpiredError") error = handleExpiredTokenError();
    if (err.code === 11000) error = handleDuplicateError(err);
    sendProdError(error, res);
  }
};
