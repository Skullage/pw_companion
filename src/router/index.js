import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if(to.matched.some(record => record.meta.authRequired)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        // params: { nextUrl: to.fullPath }
      })
    } else {
        next()
    }
  } else {
    next()
  }
});

export default router
