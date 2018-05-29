import Vue from 'vue';
import VueCookie from 'vue-cookie';
import Bus, { EVENT } from '@/common/bus';
import i18n from '@/common/lang';
import SETTING from '@/setting';

Vue.use(VueCookie);

const ONE_MIN_MS = 60 * 1000,
    ONE_HOUR_MS = 60 * 60 * 1000,
    ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getDateString = date => {
    let month = date.getMonth() + 1,
        day = date.getDate();
    month < 10 && (month = `0${month}`);
    day < 10 && (day = `0${day}`);
    return `${date.getFullYear()}-${month}-${day}`;
};

const getTimeString = date => {
    const now = new Date(),
        time = now.getTime() - date.getTime(),
        minutes = Math.floor(time / ONE_MIN_MS);
    if (minutes < 1) {
        return i18n.t('common.just');
    }
    const hours = Math.floor(time / ONE_HOUR_MS);
    if (hours < 1) {
        return `${minutes}${i18n.t('common.minuetsAgo')}`;
    }
    const days = Math.floor(time / ONE_DAY_MS);
    if (days < 1) {
        return `${hours}${i18n.t('common.hoursAgo')}`;
    } else if (days === 1) {
        return i18n.t('common.yesterday');
    } else if (days === 2) {
        return i18n.t('common.twoDaysAgo');
    } else if (days <= 30) {
        return `${days}${i18n.t('common.daysAgo')}`;
    }
    return getDateString(date);
};

class Utils {
    static getToken () {
        return Vue.cookie.get(SETTING.TOKEN_COOKIE_KEY);
    }

    static setToken (token) {
        Vue.cookie.set(SETTING.TOKEN_COOKIE_KEY, token, 7);
        Bus.$emit(EVENT.TOKEN_REFRESH);
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

    static isArray (object) {
        return Object.prototype.toString.call(object) === '[object Array]';
    }

    static randString (len = 8) {
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let str = '';
        for (let i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    }

    static errorLog (err, modules = 'ET-BLOG') {
        if (!SETTING.DEBUG) {
            return;
        }
        const message = `[${modules}] ${err.response ? err.response.data : err.message}`;
        /* eslint-disable no-console */
        console.log(message);
    }

    static formatNone (str) {
        const items = ['', null, undefined];
        if (items.indexOf(str) !== -1) {
            return '-';
        }
        return str;
    }

    static formatCount (count, max = 999) {
        const number = parseInt(count);
        return number > max ? max : number;
    }

    static formatTime (str, type = 'time') {
        if (!str) {
            return '-';
        }
        try {
            let dataArr = [], timeArr = [];
            const arr = str.replace('T', ' ').replace('Z', '').split('.')[0].split(' ');
            dataArr = arr[0].split('-');
            timeArr = arr[1].split(':');
            const timeObj = new Date(Date.UTC(
                parseInt(dataArr[0]), parseInt(dataArr[1]) - 1, parseInt(dataArr[2]),
                parseInt(timeArr[0]), parseInt(timeArr[1]), parseInt(timeArr[2]))
            );
            if (type === 'time') {
                return getTimeString(timeObj);
            } else if (type === 'date') {
                return getDateString(timeObj);
            }
            return timeObj.toLocaleString('zh-Hans-CN', { hour12: false });
        } catch (e) {
            return '-';
        }
    }
}

export default Utils;
