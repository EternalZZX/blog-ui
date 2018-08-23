import Vue from 'vue';
import ElementUI from 'element-ui';
import 'static/theme/index.css';
import 'static/styles/animate.css';
import router from '@/router';
import store from '@/store';
import i18n from '@/common/lang';
import Bus from '@/common/bus';
import EtComponents from '@/components';
import index from '@/index';
import '@/common/filters';
import '@/common/permission';
import '@/common/highlight';

if (window !== top) {
    top.location.href = window.location.href;
}

Vue.use(ElementUI);
Vue.use(EtComponents);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#index',
    router,
    store,
    i18n,
    components: { index },
    data: {
        Bus
    },
    template: '<index/>'
});
