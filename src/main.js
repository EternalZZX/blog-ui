import Vue from 'vue';
import VueInfiniteScroll from 'vue-infinite-scroll';
import ElementUI from 'element-ui';
import '~/theme/index.css';
import '~/styles/animate.css';
import router from '@/router';
import store from '@/store';
import i18n from '@/common/lang';
import Utils from '@/common/utils';
import index from '@/index';

Vue.use(VueInfiniteScroll);
Vue.use(ElementUI);

Vue.filter('none', value => Utils.formatNone(value));
Vue.filter('time', value => Utils.formatTime(value));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#index',
    router,
    store,
    i18n,
    components: { index },
    template: '<index/>'
});
