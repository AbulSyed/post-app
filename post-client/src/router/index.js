import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import AddPost from '../views/AddPost.vue'
import Profile from '../views/Profile.vue'

const requireAuth = (to, from, next) => {
  if(!localStorage.getItem('token')){
    next({ name: 'Login' })
  }else{
    next()
  }
}

const requireNoAuth = (to, from, next) => {
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
    beforeEnter: requireNoAuth
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireNoAuth
  },
  {
    path: '/addPost',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
