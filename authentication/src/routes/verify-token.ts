import express, { Request, Response } from 'express'
import { validateToken } from '../utils/tokenActions'
import { validationResult } from 'express-validator'
import { routesInputValidation } from '../utils/commonActions'
import { routeNames, verifyTokenValidation } from '../utils/constants'

const router = express.Router()

router.post(routeNames.verifyTokenRoute, routesInputValidation(verifyTokenValidation), (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array())
    }
    try {
        validateToken(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(401)
    }
})

export { router as verifyTokenRouter }
