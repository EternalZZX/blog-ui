import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import index from './index';
import router from './router';

Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#index',
    router,
    components: { index },
    template: '<index/>'
});
