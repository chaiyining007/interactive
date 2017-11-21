import cookie from 'libs/src/cookie'
import get_only_token from "./get_only_token";
class UserData {
    set Auth_Token(value = "") {
        cookie('X-Auth-Token', value);
    }
    get Auth_Token() {
        return cookie('X-Auth-Token') || ""
    }
    get is_login() {
        return !!this.Auth_Token;
    }
    out() {
        this.Auth_Token = "";
        get_only_token();
    }
}

export default new UserData();