export default [
    {
        path: '/calc',
        name: 'calc',
        component: () => import(/* webpackChunkName: "group-calcs" */ '@/views/CalcView.vue'),
        meta: {
            title: "PW companion - Калькуляторы",
            transition: 'slide-right'
        },
    },
    {
        path: '/calc/house',
        name: 'HouseCalc',
        component: () => import(/* webpackChunkName: "group-calcs" */ '@/views/calcs/HouseCalc.vue'),
        meta: {
            title: "PW companion - Калькулятор дома",
            transition: 'slide-left'
        },
    },
    {
        path: '/calc/weapon',
        name: 'WeaponCalc',
        component: () => import(/* webpackChunkName: "group-calcs" */ '@/views/calcs/WeaponCalc.vue'),
        meta: {
            title: "PW companion - Калькулятор домопухи",
            transition: 'slide-left'
        },
    },
    {
        path: '/calc/armor',
        name: 'ArmorCalc',
        component: () => import(/* webpackChunkName: "group-calcs" */ '@/views/calcs/ArmorCalc.vue'),
        meta: {
            title: "PW companion - Калькулятор сумеречной экипировки",
            transition: 'slide-left'
        },
    },
    {
        path: '/calc/cloak',
        name: 'CloakCalc',
        component: () => import(/* webpackChunkName: "group-calcs" */ '@/views/calcs/CloakCalc.vue'),
        meta: {
            title: "PW companion - Калькулятор накидок с императорской битвы",
            transition: 'slide-left'
        },
    },
    {
        path: '/calc/ring',
        name: 'RingCalc',
        component: () => import(/* webpackChunkName: "group-calcs" */ '@/views/calcs/RingCalc.vue'),
        meta: {
            title: "PW companion - Калькулятор колец с арены Авроры",
            transition: 'slide-left'
        },
    },
    {
        path: '/calc/genie',
        name: 'GenieCalc',
        component: () => import(/* webpackChunkName: "group-calcs" */ '@/views/calcs/GenieCalc.vue'),
        meta: {
            title: "PW companion - Калькулятор джина",
            transition: 'slide-left'
        },
    },
]