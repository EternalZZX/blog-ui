import i18n from '@/common/lang';

export const validateReg = {
    none: /^.+$/,
    integer: /^[0-9]\d{0,7}$/,
    name: /^[A-Za-z0-9_-]{3,}$/,
    nick: /^[\u4e00-\u9fa5\-_a-zA-Z0-9]{2,}$/,
    email: /^([a-zA-Z0-9_-])+@(([a-zA-Z0-9_-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    phone: /^1[3|4|5|7|8]\d{9}$/,
    password: /^.{6,}$/,
    url: /^(f|ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w-./#?%&=]*)?$/
};

class Validate {
    constructor (config) {
        this.regs = config;
        for (const method of Object.keys(this.regs)) {
            this[method] = (rule, value, callback) => {
                this._validateForm(rule, value, callback, method);
            };
        }
    }

    test (data, rules) {
        for (const key of Object.keys(rules)) {
            const value = data[key];
            for (const rule of rules[key]) {
                if (rule.required && (!value || (value.trim && !value.trim().length))) {
                    return {
                        result: false,
                        message: rule.message ? rule.message : i18n.t('validate.none')
                    };
                }
                if (rule.validator &&
                    this.regs[rule.validator] &&
                    !this.regs[rule.validator].test(value)) {
                    return {
                        result: false,
                        message: rule.message ? rule.message : i18n.t(`validate.${rule.validator}`)
                    };
                }
            }
        }
        return { result: true };
    }

    _validateForm (rule, value, callback, type) {
        const reg = this.regs[type];
        if (value === '' || value == null ||
            (value.trim && value.trim().length === 0)) {
            if (rule.required) {
                callback(new Error(i18n.t('validate.none')));
                return false;
            } else {
                callback();
                return true;
            }
        } else if (reg && !reg.test(value)) {
            callback(new Error(i18n.t(`validate.${type}`)));
            return false;
        } else {
            callback();
            return true;
        }
    }
}

export default new Validate(validateReg);
