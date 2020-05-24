import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

axios.interceptors.response.use(function (config) {
    return config
}, function (error) {
    if (error.response.status === 401) {
        if (error.config.url.search('/login') === -1) {
            const emptyUserInfo = JSON.stringify({});
            sessionStorage.setItem("userInfo", emptyUserInfo);
            history.push('/auth/login')
            // eslint-disable-next-line no-restricted-globals
            location.reload()
            return ''
        }
        throw error
    }
    throw error
})



export const get = (url, data = {}) => {
    return axios.get(url, data);
}



export const post = (url, data) => {
    return axios.post(url, data)
}