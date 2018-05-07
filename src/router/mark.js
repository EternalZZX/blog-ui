export default {
    base: '/mark',
    routes: [{
        path: '/',
        name: 'mark',
        component: () => import('@/modules/mark/mark'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
