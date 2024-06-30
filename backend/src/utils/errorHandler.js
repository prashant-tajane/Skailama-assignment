class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}

export default ErrorHandler;
