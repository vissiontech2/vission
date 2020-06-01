import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { DatabaseValidationError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-errors'

export const errorHandler = (err: Error, req: Request, res: Response, nex: NextFunction) => {

    if (err instanceof RequestValidationError) {
        const formattedErrors = err.error.map(error => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(400).send({ error: formattedErrors })
    }

    if (err instanceof DatabaseValidationError) {
        return res.status(400).send({
            error: [{
                message: err.reason
            }]
        })
    }

    res.status(400).send([
        {
            message: 'something went wrong'
        }
    ]);
}