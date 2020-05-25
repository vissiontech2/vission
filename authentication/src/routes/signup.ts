import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'


const router = express.Router()

router.get('/auth/signup', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('password must be at least 4 chars and max of 20')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }
    res.send('signup request')
})

export { router as signupRouter }
