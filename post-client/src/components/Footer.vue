<template>
  <div class="footer">
    <button @click="goto('/')">Home</button>
    <button @click="goto('/addPost')">Post</button>
    <button @click="goto('/profile')">Profile</button>
  </div>
</template>

<script>
export default {
  methods: {
    goto(path){
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgb(255, 254, 254);
  display: flex;
  justify-content: space-around;
}
</style>