<template>
  <div class="add-post">
    <Header />
    <form @submit.prevent="handleSubmit">
      <textarea required placeholder="desc" v-model="desc"></textarea>
      <input type="file" @change="handleChange">
      <button>
        <span class="material-icons">add</span>
      </button>
      <div v-if="fileError" class="error">{{ fileError }}</div>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: { Header, Footer },
  data(){
    return {
      desc: '',
      file: '',
      fileError: null,
      allowedTypes: ['image/png', 'image/jpeg']
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    handleChange(e){
      const selected = e.target.files[0]

      if(selected && this.allowedTypes.includes(selected.type)){
        this.file = selected
        this.fileError = null
      }else{
        this.file = null
        this.fileError = 'Please select an image file'
      }
    },
    async handleSubmit(){
      const res = await this.$store.dispatch('uploadImage', this.file)
      await this.$store.dispatch('addPost', {
        desc: this.desc,
        img: res.url,
        filePath: res.filePath
      })
      if(!this.error){
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style scoped>
form {
  margin: 15rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
}
form textarea,
form input[type='password'] {
  border: none;
  outline: none;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #eee;
}
form textarea:focus {
  border: 1px solid #aaa;
}
form input[type='file'] {
  margin-bottom: 1.4rem;
}
form button {
  border: none;
  outline: none;
  cursor: pointer;
}
.error {
  color: rgb(243, 35, 35);
  text-align: center;
  padding: 1rem 0;
  font-size: 1.4rem;
}
</style>