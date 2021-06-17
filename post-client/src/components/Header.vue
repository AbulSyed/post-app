<template>
  <div class="header">
    <div v-if="user">
      <p>Welcome {{ user.name }}</p>
    </div>
    <button @click="handleClick">
      <span class="material-icons">logout</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleClick(){
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  background: rgb(255, 254, 254);
}
p {
  font-size: 1.8rem;
  font-weight: 700;
}
button {
  border: none;
  outline: none;
  background: none;
  appearance: none;
  padding: .5rem;
  cursor: pointer;
}
button:hover {
  color: rgb(105, 105, 105);
}
</style>