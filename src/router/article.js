export default {
    base: '/article',
    routes: [{
        path: ':uuid',
        name: 'article',
        component: () => import('@/modules/article/article'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
