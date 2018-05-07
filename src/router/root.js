export default {
    base: '/',
    routes: [{
        path: '/',
        alias: '/home',
        name: 'home',
        component: () => import('@/modules/home/home'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
