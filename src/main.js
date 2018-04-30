import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
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
        'zh': require('@/common/lang/zh'),
        'en': require('@/common/lang/en')
    }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#index',
    router,
    i18n,
    components: { index },
    template: '<index/>'
});
