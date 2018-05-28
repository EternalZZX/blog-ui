import Vue from 'vue';
import Utils from '@/common/utils';

Vue.filter('none', value => Utils.formatNone(value));
Vue.filter('count', value => Utils.formatCount(value, 999));
Vue.filter('number', value => Utils.formatCount(value, 9999999));
Vue.filter('time', value => Utils.formatTime(value, 'time'));
Vue.filter('date', value => Utils.formatTime(value, 'date'));
