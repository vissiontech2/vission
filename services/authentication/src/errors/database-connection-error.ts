import { ValidationError } from 'express-validator'


export class DatabaseValidationError extends Error {
    reason = 'Error connectiong to database';
    constructor(public error: ValidationError[]) {
        super()

        Object.setPrototypeOf(this, DatabaseValidationError.prototype);
    }
}