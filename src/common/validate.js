import i18n from '@/common/lang';

export const validateReg = {
    integer: /^[0-9]\d{0,7}$/,
    name: /^[A-Za-z0-9_-]{3,}$/,
    nick: /^[\u4e00-\u9fa5\-_a-zA-Z0-9]{2,}$/,
    email: /^([a-zA-Z0-9_-])+@(([a-zA-Z0-9_-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    phone: /^1[3|4|5|7|8]\d{9}$/,
    password: /^.{6,}$/,
    url: /^(f|ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w-./#?%&=]*)?$/
};

const validate = (data, rules) => {
    for (const key in data) {
        if (!rules[key]) {
            continue;
        }
        const value = data[key];
        for (const rule of rules[key]) {
            if (rule.required && (!value || (value.trim && !value.trim().length))) {
                return {
                    result: false,
                    message: rule.message ? rule.message : i18n.t('validate.none')
                };
            }
            if (rule.validator &&
                validateReg[rule.validator] &&
                !validateReg[rule.validator].test(value)) {
                return {
                    result: false,
                    message: rule.message ? rule.message : i18n.t(`validate.${rule.validator}`)
                };
            }
        }
    }
    return { result: true };
};

export default validate;
