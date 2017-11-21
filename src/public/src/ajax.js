import axios from 'axios';
import cookie from 'libs/src/cookie'
const ajax = axios.create({
    baseURL: '//127.0.0.1:7001/api/',
    timeout: 5000,
    headers: {
        'x-csrf-token': "test"
    }
});
ajax.interceptors.response.use(function ({ data }) {
    return data;
}, function (err) {
    if (err.response.status === 401) {
    }
    return Promise.reject(err);
});
export default ajax;