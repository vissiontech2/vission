import express, { Request, Response } from 'express'
import { validateToken } from '../utils/token'

const router = express.Router()

router.get('/auth/verify-token', (req: Request, res: Response) => {
    try {
        validateToken(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(401)
    }
})

export { router as verifyTokenRouter }
