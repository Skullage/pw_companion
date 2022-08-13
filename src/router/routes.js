const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      meta: {title: "PW companion"},
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