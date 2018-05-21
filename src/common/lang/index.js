import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementLocale from 'element-ui/lib/locale';
import zhLocale from './zh';
import enLocale from './en';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        'zh': zhLocale,
        'en': enLocale
    }
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
