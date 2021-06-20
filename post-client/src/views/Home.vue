<template>
  <div class="home">
    <Header />
    <div class="feed">
      <div v-for="post in posts" :key="post._id" class="post">
        <div class="post-header">
          <h3 class="post-name">Posted by {{ post.name }}</h3>
          <button v-if="$store.state.auth.user && $store.state.auth.user._id === post.owner" @click="handleClick(post.filePath, post._id)">
            <span class="material-icons">delete</span>
          </button>
        </div>
        <img :src="post.img" alt="" class="post-img">
        <p class="post-desc">{{ post.desc }}</p>
        <p>{{ formatDate(post.createdAt) }}</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { mapState } from 'vuex'
import { formatDistanceToNow } from 'date-fns'

export default {
  components: { Header, Footer },
  computed: {
    ...mapState({
      posts: state => state.posts.posts
    })
  },
  methods: {
    formatDate(createdAt){
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    },
    async handleClick(filePath, _id){
      await this.$store.dispatch('images/deleteImage', filePath)
      await this.$store.dispatch('posts/deletePost', _id)
    }
  },
  created(){
    this.$store.dispatch('posts/fetchPosts')
  }
}
</script>

<style scoped>
.feed {
  margin: 7rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post {
  padding: 1rem;
  margin: 1rem 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
}
button {
  border: none;
  outline: none;
  background: none;
  appearance: none;
  cursor: pointer;
  transition: all .2s;
}
button:hover {
  color: rgb(105, 105, 105);
}
span {
  font-size: 2rem;
}
.post-img {
  width: 400px;
  height: 400px;
}
@media(max-width: 768px) {
  .post-img {
    width: 300px;
    height: 300px;
  }
}
.post-desc {
  padding: .5rem 0;
  font-size: 1.6rem;
  font-weight: 700;
}
</style>
