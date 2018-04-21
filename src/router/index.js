import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/modules/home';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }]
});
