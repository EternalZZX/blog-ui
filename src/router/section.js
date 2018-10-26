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
    }, {
        path: 'setting/:name',
        name: 'sectionSetting',
        component: () => import('@/modules/section/section-setting'),
        meta: {
            auth: true,
            keepAlive: true
        }
    }]
};
