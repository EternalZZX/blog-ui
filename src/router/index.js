import Vue from 'vue';
import VueRouter from 'vue-router';
import Common from '@/common/common';
import header from '@/modules/header/header';
import footer from '@/modules/footer/footer';
import rootRouter from './root';
import sectionRouter from './section';
import articleRouter from './article';
import markRouter from './mark';
import albumRouter from './album';

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
    name: 'EtRouter',
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
        path: articleRouter.base,
        component: frameCompontent,
        children: articleRouter.routes
    }, {
        path: markRouter.base,
        component: frameCompontent,
        children: markRouter.routes
    }, {
        path: albumRouter.base,
        component: frameCompontent,
        children: albumRouter.routes
    }],
    scrollBehavior (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        Common.auth()
            .then(data => Common.getPermission())
            .then(data => {
                next();
            }).catch(reason => {
                next(false);
            });
    } else {
        next();
    }
});

export default router;
