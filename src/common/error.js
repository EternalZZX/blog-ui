class RequestError extends Error {
    constructor (message) {
        super(message);
        this.name = 'RequestError';
        this.type = 'error';
    }
}

class ValidationError extends Error {
    constructor (message) {
        super(message);
        this.name = 'ValidationError';
        this.type = 'info';
    }
}

export { RequestError, ValidationError };
