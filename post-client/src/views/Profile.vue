<template>
  <div class="profile">
    <Header />
    <div class="feed">
      <div v-for="post in profilePosts" :key="post._id" class="post">
        <div class="image">
          <img :src="post.img" alt="" class="post-img">
        </div>
      </div>
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
    ...mapState(['profilePosts'])
  },
  created(){
    this.$store.dispatch('fetchProfilePosts')
  }
}
</script>

<style scoped>
.feed {
  display: flex;
}
.post-img {
  width: 200px;
}
/* .profile {
  margin: 5rem 0;
} */
.feed {
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  padding: 1rem; */
  /* display: flex;
  flex-wrap: wrap; */
}
/* .post {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 1rem;
} */
/* .post-img {
  width: 100%;
  display: block;
} */
/* .image {
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
} */
/* img {
  width: 150%;
  height: 150%;
  display: block;
} */
/* @media(max-width: 425px){
  .feed {
    grid-template-columns: 1fr 1fr;
  }
}
@media(min-width: 1024px){
  .feed {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
} */
</style>