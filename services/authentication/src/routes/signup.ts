import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { routesInputValidation } from '../utils/commonActions'
import { routeNames, signUpValidation } from '../utils/constants'
import { DatabaseValidationError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-errors'


const router = express.Router()

router.post(routeNames.signUpRoute, routesInputValidation(signUpValidation), (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }
    res.send('signup request')
})

export { router as signupRouter }
