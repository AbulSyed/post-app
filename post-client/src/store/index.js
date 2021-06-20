import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import posts from './modules/posts'
import images from './modules/images'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    error: null,
  },
  mutations: {
    SET_ERROR(state, error){
      state.error = error
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth,
    posts,
    images
  }
})
