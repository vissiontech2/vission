
import { AuthBody, UserInfo } from '../commonTypes'
import { ValidationType } from '../commonTypes'
import { body } from 'express-validator'

var users = require('../dummyData/currentUsers.json')


export const findUser = (userInfo: AuthBody) => {
    return users.find((user: UserInfo) => user.email === userInfo.email && user.password === userInfo.password);
}

export const routesInputValidation: (data: any[]) => any = (data: any[]) => {
    return data.map((val: ValidationType) => {
        if (val.name === 'password') {
            const length = val.length || { min: 4, max: 20 }
            return body(val.name).trim().isLength(length).withMessage(val.error)
        } else if (val.name === 'email') {
            return body(val.name).isEmail().withMessage(val.error)
        } else {
            return body(val.name).isString().withMessage(val.error)
        }
    })
}