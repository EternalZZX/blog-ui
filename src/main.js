import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import '~/theme/index.css';
import ElementLocale from 'element-ui/lib/locale';
import zhLocale from '@/common/lang/zh';
import enLocale from '@/common/lang/en';
import index from '@/index';
import router from '@/router';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(VueI18n);
Vue.use(ElementUI);

const i18n = new VueI18n({
    locale: 'zh',
    fallbackLocale: 'en',
    messages: {
        'zh': zhLocale,
        'en': enLocale
    }
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#index',
    router,
    i18n,
    components: { index },
    template: '<index/>'
});
