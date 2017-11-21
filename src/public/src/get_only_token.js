import cookie from 'libs/src/cookie'
import { session_storage } from "libs/src/localStorage";
import { encode } from "libs/src/base64";
export default (is_get_auth_token = true) => {
    if (cookie('temporary_token')) {
        session_storage("temporary_token", cookie('temporary_token'));
    }
    //优先取服务端的登录标示
    var _token;
    if (is_get_auth_token) {
        _token = cookie('X-Auth-Token') || '';
    }
    //再取曾经存在的临时token
    if (!_token) {
        _token = session_storage("temporary_token");
    }
    //不存在临时token，产生一个
    if (!_token) {
        _token = encode((+new Date()) + "_" + Math.random() * 99999999);
        session_storage("temporary_token", _token)
    }
    return _token;
}