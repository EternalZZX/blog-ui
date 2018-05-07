export default {
    base: '/section',
    routes: [{
        path: '/',
        name: 'section',
        component: () => import('@/modules/section/section'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
