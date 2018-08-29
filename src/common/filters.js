import Vue from 'vue';
import Utils from '@/common/utils';

Vue.filter('none', value => Utils.formatNone(value));
Vue.filter('count', value => Utils.formatCount(value));
Vue.filter('time', value => Utils.formatTime(value, 'time'));
Vue.filter('date', value => Utils.formatTime(value, 'date'));
Vue.filter('datetime', value => Utils.formatTime(value, 'datetime'));
