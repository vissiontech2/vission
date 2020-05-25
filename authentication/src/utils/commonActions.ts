
import { AuthBody, UserInfo } from '../commonTypes'

var users = require('../dummyData/currentUsers.json')
export const findUser = (userInfo: AuthBody) => {
    return users.find((user: UserInfo) => user.email === userInfo.email && user.password === userInfo.password);
}