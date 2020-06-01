import express, { Response, Request } from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import Mongoose from 'mongoose'




const app = express();

app.use(json())
app.use(cors())

app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

app.get('/auth', (req: Request, res: Response) => {
    res.send('auth: i am alive')
})

app.listen(3000, () => {
    console.log('listening on port 3000 !!!')
})