import adminRoutes from './admin';
import calcsRoutes from './calcs';


const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
          title: "PW companion"
      },
    },
    {
      path: '/login',
      name: 'LoginPanel',
      component: () => import('@/views/LoginPanel.vue'),
      meta: {
          title: "PW companion - Авторизация"
      },
    },
    { 
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import('@/views/NotFound.vue'),
      meta: {
          title: "ОШИБКА 404 - Страница не найдена"
      },
    },
].concat(adminRoutes, calcsRoutes);

export default routes