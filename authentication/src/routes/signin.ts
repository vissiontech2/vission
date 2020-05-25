import express, { Request, Response } from 'express'
import { getToken } from '../utils/token'
import { findUser } from '../utils/commonActions'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post('/auth/signin', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').trim().isLength({ min: 4, max: 10 }).withMessage('password must be at least 4 chars and max of 20')
], (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }

    try {
        const user = findUser(req.body)
        console.log('login request for =>', user, 'has came in');
        const userToken = getToken(user)
        res.send({ userToken, user })
    } catch (error) {
        res.sendStatus(401)
    }
})

export { router as signinRouter }