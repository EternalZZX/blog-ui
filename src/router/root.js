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
    }, {
        path: 'profile/:uuid',
        name: 'profile',
        component: () => import('@/modules/profile/profile'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }, {
        path: 'setting',
        name: 'setting',
        component: () => import('@/modules/setting/setting'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
