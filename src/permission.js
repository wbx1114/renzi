import router from '@/router'
import store from '@/store'
import { asyncRoutes } from './router/index'
const writeList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    if (!store.getters.userId) {
      const roles = await store.dispatch('user/getUserInfo')
      console.log(asyncRoutes)
      console.log(roles)

      const filterRouter = asyncRoutes.filter(item => {
        return roles.menus.includes(item.meta.id)
      })

      console.log(filterRouter)
      router.addRoutes([...filterRouter, { path: '*', redirect: '/404', hidden: true }])
      store.commit('permission/setRoutes', filterRouter)
      next(to.path)
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (writeList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
