import { secretKey } from '../utils/secretKey'
import { UserInfo, Token, AuthBody } from '../commonTypes'
import jwt from 'jsonwebtoken'

export const validateToken = (token: Token) => {
    const decoded = jwt.verify(token.token, secretKey)
    return decoded
}

export const getToken = (userInfo: UserInfo) => {
    var token = jwt.sign(userInfo, secretKey, { expiresIn: 60 * 60 });
    return token
}