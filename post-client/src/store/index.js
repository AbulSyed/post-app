import { createStore } from 'vuex'
import api from '../api/api'
import { storageService } from '../firebase/config'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: null,
    error: null,
    posts: [],
    url: null,
    profilePosts: []
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
      state.posts = state.posts.concat({
        _id: post._id,
        name: post.name,
        desc: post.desc,
        img: post.img,
        createdAt: post.createdAt
      })
    },
    SET_POSTS(state, posts){
      state.posts = posts
    },
    SET_PROFILE_POSTS(state, profilePosts){
      state.profilePosts = profilePosts
    },
    DELETE_POST(state, _id){
      state.posts = state.posts.filter(post => post._id !== _id)
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
      context.commit('SET_ERROR', null)
    },
    async uploadImage(context, file){
      const filePath = `images/${context.state.user._id}/${file.name}`
      const storageRef = storageService.ref(filePath)

      try {
        const res = await storageRef.put(file)
        const url = await res.ref.getDownloadURL()
        context.commit('SET_URL', url)
        context.commit('SET_ERROR', null)
        return { url, filePath }
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
    },
    async fetchPosts(context){
      try {
        const res = await api.get('/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        context.commit('SET_POSTS', res.data)
        context.commit('SET_ERROR', null)
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data)
      }
    },
    async fetchProfilePosts(context){
      try {
        const res = await api.get('/profileposts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        context.commit('SET_PROFILE_POSTS', res.data)
        context.commit('SET_ERROR', null)
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data)
      }
    },
    async deleteImage(context, filePath){
      const storageRef = storageService.ref(filePath)

      try {
        await storageRef.delete()
        context.commit('SET_ERROR', null)
      }catch(err){
        console.log(err.message)
        context.commit('SET_ERROR', err.message)
      }
    },
    async deletePost(context, _id){
      try {
        await api.delete(`/posts/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        context.commit('DELETE_POST', _id)
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
