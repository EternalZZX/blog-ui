class ValidationError extends Error {
    constructor (message) {
        super(message);
        this.name = 'ValidationError';
        this.type = 'info';
    }
}

export { ValidationError };
