export default {
    base: '/',
    routes: [{
        path: '/',
        name: 'home',
        component: () => import('@/modules/home'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
