export default {
    base: '/album',
    routes: [{
        path: ':uuid',
        name: 'album',
        component: () => import('@/modules/album/album'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }, {
        path: 'profile/:uuid',
        name: 'albumProfile',
        component: () => import('@/modules/album/album-profile'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
