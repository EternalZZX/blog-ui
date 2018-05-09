import SETTING from '@/setting';

class Utils {
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
        const message = `[${modules}]${err.response ? err.response.data : err.message}`;
        console.warn(message);
    }
}

export default Utils;
