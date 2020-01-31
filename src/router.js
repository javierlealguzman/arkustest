import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./components/Home')
  },
  {
      path: '/contacts',
      name: 'contacts',
      component: () => import('./components/ContactList')
  },
  {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./components/ContactDetail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router