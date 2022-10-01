const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      meta: {title: "PW companion"},
    },
    {
      path: '/addGenieSkill',
      name: 'addGenieSkill',
      component: () => import(/* webpackChunkName: "addGenieSkill" */ '@/views/addGenieSkill.vue'),
      meta: {
        title: "PW companion - Добавить скилл джина",
      },
    },
    {
      path: '/updateGenieSkill/id=:id',
      name: 'updateGenieSkill',
      component: () => import(/* webpackChunkName: "addGenieSkill" */ '@/views/updateGenieSkill.vue'),
      meta: {
        title: "PW companion - Добавить скилл джина",
      },
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: () => import(/* webpackChunkName: "addUser" */ '@/views/AdminPanel.vue'),
      meta: {
        title: "PW companion - Панель администратора",
        authRequired: true,
      },
      
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: () => import(/* webpackChunkName: "addUser" */ '@/views/addUser.vue'),
      meta: {title: "PW companion - Создать пользователя"},
    },
    {
      path: '/login',
      name: 'LoginPanel',
      component: () => import(/* webpackChunkName: "AdminPanel" */ '@/views/LoginPanel.vue'),
      meta: {title: "PW companion - Авторизация"},
    },
    {
      path: '/calc/house',
      name: 'HouseCalc',
      component: () => import(/* webpackChunkName: "HouseCalc" */ '@/views/calcs/HouseCalc.vue'),
      meta: {title: "PW companion - Калькулятор дома"},
    },
    {
      path: '/calc/weapon',
      name: 'WeaponCalc',
      component: () => import(/* webpackChunkName: "WeaponCalc" */ '@/views/calcs/WeaponCalc.vue'),
      meta: {title: "PW companion - Калькулятор домопухи"},
    },
    {
      path: '/calc/armor',
      name: 'ArmorCalc',
      component: () => import(/* webpackChunkName: "ArmorCalc" */ '@/views/calcs/ArmorCalc.vue'),
      meta: {title: "PW companion - Калькулятор сумеречной экипировки"},
    },
    {
      path: '/calc/cloak',
      name: 'CloakCalc',
      component: () => import(/* webpackChunkName: "CloakCalc" */ '@/views/calcs/CloakCalc.vue'),
      meta: {title: "PW companion - Калькулятор накидок с императорской битвы"},
    },
    {
      path: '/calc/ring',
      name: 'RingCalc',
      component: () => import(/* webpackChunkName: "RingCalc" */ '@/views/calcs/RingCalc.vue'),
      meta: {title: "PW companion - Калькулятор колец с арены Авроры"},
    },
    {
      path: '/calc/genie',
      name: 'GenieCalc',
      component: () => import(/* webpackChunkName: "GenieCalc" */ '@/views/calcs/GenieCalc.vue'),
      meta: {
        title: "PW companion - Калькулятор джина",
        authRequired: true,
      },
    },
    { 
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'),
      meta: {title: "ОШИБКА 404 - Страница не найдена"},
    },
    {
      path: '/calc',
      name: 'calc',
      component: () => import(/* webpackChunkName: "calc" */ '@/views/CalcView.vue'),
      meta: {title: "PW companion - Калькуляторы"},
    },
]

export default routes