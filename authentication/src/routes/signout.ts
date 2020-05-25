import express, { Request, Response } from 'express'
import { routeNames } from '../utils/constants'


const router = express.Router()

router.post(routeNames.signoutRoute, (req: Request, res: Response) => {
    res.send('signout request')
})

export { router as signoutRouter }
