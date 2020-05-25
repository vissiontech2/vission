import express, { Request, Response } from 'express'


const router = express.Router()

router.get('/auth/signout', (req: Request, res: Response) => {
    res.send('signout request')
})

export { router as signoutRouter }
