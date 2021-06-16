import { createStore } from 'vuex'
import api from '../api/api'
import { storageService } from '../firebase/config'

export default createStore({
  state: {
    user: null,
    error: null,
    feed: [
      {
        _id: 0,
        name: 'abul',
        desc: 'miles morales',
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spiderman-1604616315.jpg?crop=0.5xw:1xh;center,top&resize=640:*',
        timestamp: '2021-06-12T12:59:57.337Z'
      },
      {
        _id: 1,
        name: 'syed',
        desc: 'kung fu panda',
        img: 'https://i.pinimg.com/originals/47/b5/ba/47b5ba2fc47a122a2dc5949cf17e5c84.jpg',
        timestamp: '2021-06-12T12:59:57.337Z'
      },
      {
        _id: 2,
        name: 'unknown user',
        desc: 'vueee',
        img: 'https://www.dotcom-monitor.com/blog/wp-content/uploads/sites/3/2020/05/Vue-logo-1.png',
        timestamp: '2021-06-12T12:59:57.337Z'
      }
    ],
    url: null
  },
  mutations: {
    SET_USER(state, user){
      state.user = user
    },
    SET_ERROR(state, error){
      state.error = error
    },
    SET_URL(state, url){
      state.url = url
    },
    ADD_POST(state, post){
      state.feed = state.feed.concat({
        _id: post._id,
        name: post.name,
        desc: post.desc,
        img: post.img,
        timestamp: post.createdAt
      })
    }
  },
  actions: {
    async signup(context, user){
      try {
        const res = await api.post('/users', user)
        context.commit('SET_USER', res.data.user)
        localStorage.setItem('token', res.data.token)
        context.commit('SET_ERROR', null)
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data)
      }
    },
    async login(context, user){
      try {
        const res = await api.post('/users/login', user)
        context.commit('SET_USER', res.data.user)
        localStorage.setItem('token', res.data.token)
        context.commit('SET_ERROR', null)
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data)
      }
    },
    logout(context){
      localStorage.removeItem('token')
      context.commit('SET_USER', null)
    },
    async uploadImage(context, file){
      const storageRef = storageService.ref(`images/${context.state.user._id}/${file.name}`)

      try {
        const res = await storageRef.put(file)
        await context.commit('SET_URL', res.ref.getDownloadURL())
        context.commit('SET_ERROR', null)
        return res.ref.getDownloadURL()
      }catch(err){
        console.log(err.message)
        context.commit('SET_ERROR', err.message)
      }
    },
    async addPost(context, post){
      try {
        const res = await api.post('/post', post, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        context.commit('ADD_POST', res.data)
        context.commit('SET_ERROR', null)
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data)
      }
    }
  },
  modules: {
  }
})
