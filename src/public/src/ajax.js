import axios from 'axios';
import login_data from "@/public/src/login_data";
import {encode,decode} from 'libs/src/base64'
const ajax = axios.create({
    baseURL: '//127.0.0.1:7001/api/',
    timeout: 5000,
    headers: {
        'X-Auth-Token': login_data.Auth_Token
    }
});
ajax.interceptors.response.use(function ({ data }) {
    return data;
}, function (err) {
    if (err.response.status === 401) {
        window.location.replace(`/login?success_callback_url=${encode(window.location.href)}&error_code=401`);
        return;
    }
    return Promise.reject(err);
});
export default ajax;