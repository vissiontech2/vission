import express, { Request, Response } from 'express'
import { getToken } from '../utils/tokenActions'
import { findUser, routesInputValidation } from '../utils/commonActions'
import { validationResult } from 'express-validator'
import { routeNames, signInValidation } from '../utils/constants'

const router = express.Router()

router.post(routeNames.signinRoute, routesInputValidation(signInValidation), (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }

    try {
        const user = findUser(req.body)
        const userToken = getToken(user)
        res.send({ userToken, user })
    } catch (error) {
        res.sendStatus(401)
    }
})

export { router as signinRouter }