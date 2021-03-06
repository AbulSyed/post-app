import api from '../../api/api'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user){
      state.user = user
    }
  },
  actions: {
    async signup(context, user){
      try {
        const res = await api.post('/users', user)
        context.commit('SET_USER', res.data.user)
        localStorage.setItem('token', res.data.token)
        context.commit('SET_ERROR', null, { root: true })
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data, { root: true })
      }
    },
    async login(context, user){
      try {
        const res = await api.post('/users/login', user)
        context.commit('SET_USER', res.data.user)
        localStorage.setItem('token', res.data.token)
        context.commit('SET_ERROR', null, { root: true })
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data, { root: true })
      }
    },
    logout(context){
      localStorage.removeItem('token')
      context.commit('SET_USER', null)
      context.commit('SET_ERROR', null, { root: true })
      context.commit('posts/SET_PROFILE_POSTS', [], { root: true })
    }
  },
  getters: {
    
  }
}