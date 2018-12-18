export default {
    base: '/article',
    routes: [{
        path: 'post',
        name: 'post',
        component: () => import('@/modules/article/post'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }, {
        path: 'post/:uuid',
        name: 'postUpdate',
        component: () => import('@/modules/article/post'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }, {
        path: ':uuid',
        name: 'article',
        component: () => import('@/modules/article/article'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
