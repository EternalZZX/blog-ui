import Vue from 'vue';
import Router from 'vue-router';
import header from '@/modules/header';
import footer from '@/modules/footer';
import mainRouter from './main';

Vue.use(Router);

const frameCompontent = {
    template: `
    <div class="et-blog">
        <et-header></et-header>
        <main class="et-main">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"/>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"/>
        </main>
        <et-footer></et-footer>
    </div>`,
    components: {
        'et-header': header,
        'et-footer': footer
    }
};

export default new Router({
    mode: 'history',
    base: '/',
    routes: [{
        path: mainRouter.base,
        component: frameCompontent,
        children: mainRouter.routes
    }]
});
