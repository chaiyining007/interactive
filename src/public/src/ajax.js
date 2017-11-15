import axios from 'axios';
import cookie from 'libs/src/cookie'
export default axios.create({
    baseURL: '//127.0.0.1:7001/api/',
    timeout: 5000,
    headers:{
        'x-csrf-token':"test"
    }
});;