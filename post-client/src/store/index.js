import { createStore } from 'vuex'
import api from '../api/api'

export default createStore({
  state: {
    user: null,
    error: null
  },
  mutations: {
    SET_USER(state, user){
      state.user = user
    },
    SET_ERROR(state, error){
      state.error = error
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
    }
  },
  modules: {
  }
})
