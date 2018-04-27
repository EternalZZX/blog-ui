import Vue from 'vue';
import SETTING from '@/setting';

class Common {
    static getToken () {
        return Vue.cookie.get(SETTING.TOKRN_COOKIE_KEY);
    }

    static setToken (token) {
        Vue.cookie.set(SETTING.TOKRN_COOKIE_KEY, token, 7);
    }

    static deleteToken () {
        return Vue.cookie.delete(SETTING.TOKRN_COOKIE_KEY);
    }
}

export default Common;
