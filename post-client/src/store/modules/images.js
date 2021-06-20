import { storageService } from '../../firebase/config'

export default {
  namespaced: true,
  state: {
    url: null
  },
  mutations: {
    SET_URL(state, url){
      state.url = url
    }
  },
  actions: {
    async uploadImage(context, file){
      const filePath = `images/${context.rootState.auth.user._id}/${file.name}`
      const storageRef = storageService.ref(filePath)

      try {
        const res = await storageRef.put(file)
        const url = await res.ref.getDownloadURL()
        context.commit('SET_URL', url)
        context.commit('SET_ERROR', null, { root: true })
        return { url, filePath }
      }catch(err){
        console.log(err.message)
        context.commit('SET_ERROR', err.message, { root: true })
      }
    },
    async deleteImage(context, filePath){
      const storageRef = storageService.ref(filePath)

      try {
        await storageRef.delete()
        context.commit('SET_ERROR', null, { root: true })
      }catch(err){
        console.log(err.message)
        context.commit('SET_ERROR', err.message, { root: true })
      }
    }
  },
  getters: {

  }
}