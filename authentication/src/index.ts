import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { UserInfo, Token, AuthBody } from './types'
var users = require('./currentUsers.json')

const secretKey = "raabixTechnology"

const getToken = (userInfo: UserInfo) => {
    var token = jwt.sign(userInfo, secretKey, { expiresIn: 60 * 60 });
    return token
}

const validateToken = (token: Token) => {
    const decoded = jwt.verify(token.token, secretKey)
    return decoded
}

const findUser = (userInfo: AuthBody) => {
    return users.find((user: UserInfo) => user.email === userInfo.email && user.password === userInfo.password);
}


const app = express();

app.use(json())
app.use(cors())


app.get('/auth', (req, res) => {
    res.send('auth: i am alive')
})


app.post('/auth/login', (req: express.Request, res: express.Response) => {
    try {
        const user = findUser(req.body)
        console.log('login request for =>', user, 'has came in');
        const userToken = getToken(user)
        res.send({ userToken, user })
    } catch (error) {
        res.sendStatus(401)
    }
})

app.post('/auth/verify', (req, res) => {
    try {
        validateToken(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(401)
    }
})


app.listen(3000, () => {
    console.log('listening on port 3000 !!!')
})