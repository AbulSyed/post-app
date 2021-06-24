import api from '../../api/api'

export default {
  namespaced: true,
  state: {
    posts: [],
    profilePosts: []
  },
  mutations: {
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
    async addPost(context, post){
      try {
        const res = await api.post('/posts', post, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        context.commit('ADD_POST', res.data)
        context.commit('SET_ERROR', null, { root: true })
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data, { root: true })
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
        context.commit('SET_ERROR', null, { root: true })
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data, { root: true })
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
        context.commit('SET_ERROR', null, { root: true })
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data, { root: true })
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
        context.commit('SET_ERROR', null, { root: true })
      }catch(err){
        console.log(err.response.data)
        context.commit('SET_ERROR', err.response.data, { root: true })
      }
    }
  },
  getters: {

  }
}