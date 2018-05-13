import Vue from 'vue';
import VueCookie from 'vue-cookie';
import SETTING from '@/setting';

Vue.use(VueCookie);

class Utils {
    static getToken () {
        return Vue.cookie.get(SETTING.TOKEN_COOKIE_KEY);
    }

    static setToken (token) {
        Vue.cookie.set(SETTING.TOKEN_COOKIE_KEY, token, 7);
    }

    static deleteToken () {
        return Vue.cookie.delete(SETTING.TOKEN_COOKIE_KEY);
    }

    static hasUserToken () {
        const token = this.getToken();
        return token !== null && token.substring(0, SETTING.TOKEN_FLAG.length) === SETTING.TOKEN_FLAG;
    }

    static hasGuestToken () {
        const token = this.getToken();
        return this.getToken() !== null && token.substring(0, SETTING.GUEST_FLAG.length) === SETTING.GUEST_FLAG;
    }

    static jsonClone (obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static deepClone (obj) {
        if (typeof obj != 'object' || obj === null) {
            return obj;
        }
        const newObj = obj.constructor === Array ? [] : {};
        for (const key in obj) {
            newObj[key] = this.deepClone(obj[key]);
        }
        return newObj;
    }

    static errorLog (err, modules = 'ET-BLOG') {
        if (!SETTING.DEBUG) {
            return;
        }
        const message = `[${modules}] ${err.response ? err.response.data : err.message}`;
        /* eslint-disable no-console */
        console.log(message);
    }
}

export default Utils;
