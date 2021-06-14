import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const requireAuth = (to, from, next) => {
  if(!localStorage.getItem('token')){
    next({ name: 'Login' })
  }else{
    next()
  }
}

const authed = (to, from, next) => {
  if(localStorage.getItem('token')){
    next({ name: 'Home' })
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: authed
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: authed
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router