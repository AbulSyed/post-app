<template>
  <div class="profile">
    <Header />
    <div v-if="profilePosts.length" class="profile-posts">
      <div v-for="post in profilePosts" :key="post._id" class="post">
        <img :src="post.img" alt="" class="post-img">
      </div>
    </div>
    <div v-else>
      <p>You have no posts</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: { Header, Footer },
  computed: {
    ...mapState({
      profilePosts: state => state.posts.profilePosts
    })
  },
  created(){
    this.$store.dispatch('posts/fetchProfilePosts')
  }
}
</script>

<style scoped>
.profile {
  margin: 7rem 0;
}
.profile-posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
}
.post-img {
  width: 200px;
  height: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
}
@media (min-width: 500px){
  .post-img {
    width: 300px;
    height: 300px; 
  }
}
@media(max-width: 500px){
  .profile-posts {
    grid-template-columns: 1fr;
  }
}
@media(min-width: 500px) and (max-width: 768px){
  .profile-posts {
    grid-template-columns: 1fr 1fr;
  }
}
</style>