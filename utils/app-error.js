function AppError(statusCode, message) {
	this.message = message;
	this.statusCode = statusCode;
	this.status = this.statusCode.toString().startsWith('4') ? 'fail' : 'error';
	this.isOperational = true;

	// trace stack error
	Error.captureStackTrace(this);
}

module.exports = { AppError };
