export default [
    {
        path: '/admin',
        name: 'AdminPanel',
        component: () => import(/* webpackChunkName: "group-admin" */ '@/views/AdminPanel.vue'),
        meta: {
            title: "PW companion - Панель администратора",
            authRequired: true,
        },
    },
    {
        path: '/addGenieSkill',
        name: 'addGenieSkill',
        component: () => import(/* webpackChunkName: "group-admin" */ '@/views/addGenieSkill.vue'),
        meta: {
            title: "PW companion - Добавить скилл джина",
            authRequired: true,
        },
    },
    {
        path: '/updateGenieSkill/id=:id',
        name: 'updateGenieSkill',
        component: () => import(/* webpackChunkName: "group-admin" */ '@/views/updateGenieSkill.vue'),
        meta: {
            title: "PW companion - Изменить скилл джина",
            authRequired: true,
        },
    },
    {
        path: '/addUser',
        name: 'addUser',
        component: () => import(/* webpackChunkName: "group-admin" */ '@/views/addUser.vue'),
        meta: {
            title: "PW companion - Создать пользователя",
            authRequired: true,
        },
    },
    {
        path: '/updateUser/id=:id',
        name: 'UpdateUser',
        component: () => import(/* webpackChunkName: "group-admin" */ '@/views/UpdateUser.vue'),
        meta: {
            title: "PW companion - Изменить пользователя",
            authRequired: true,
        },
    },
]