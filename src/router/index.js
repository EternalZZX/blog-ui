import Vue from 'vue';
import VueRouter from 'vue-router';
import Common from '@/common/common';
import Utils from '@/common/utils';
import header from '@/modules/header/header';
import footer from '@/modules/footer/footer';
import rootRouter from './root';
import sectionRouter from './section';
import markRouter from './mark';

Vue.use(VueRouter);

const frameCompontent = {
    template: `
    <div class="et-blog">
        <et-header></et-header>
        <main class="et-main">
            <div class="et-main__inner">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"/>
            </div>
        </main>
        <et-footer></et-footer>
    </div>`,
    components: {
        'et-header': header,
        'et-footer': footer
    }
};

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [{
        path: rootRouter.base,
        component: frameCompontent,
        children: rootRouter.routes
    }, {
        path: sectionRouter.base,
        component: frameCompontent,
        children: sectionRouter.routes
    }, {
        path: markRouter.base,
        component: frameCompontent,
        children: markRouter.routes
    }]
});

router.beforeEach((to, from, next) => {
    Common.isLogin().then(res => {
        if (res) {
            next();
        } else {
            if (!Utils.hasGuestToken()) {
                Common.guestLogin();
            }
            next();
        }
    });
});

export default router;
