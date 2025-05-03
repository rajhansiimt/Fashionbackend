const { statusCodes } = require("./constant");

//User error
class UserError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = "fail";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class PropertyError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = "fail";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

//User Not Found Error
class UserNotFoundError extends UserError {
  constructor(message) {
    super(message);
    this.name = "Not found";
    this.statusCode = statusCodes.NOT_FOUND;
    this.status = "fails";
  }
}

class PropertyNotFoundError extends PropertyError {
  constructor(message) {
    super(message);
    this.name = "Not found";
    this.statusCode = statusCodes.NOT_FOUND;
    this.status = "fails";
  }
}

module.exports = {
  UserError,
  PropertyError,
  UserNotFoundError,
  PropertyNotFoundError,
};
