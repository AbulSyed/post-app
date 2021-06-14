<template>
  <div class="header">
    <div v-if="user">
      <p>Welcome {{ user.name }}</p>
    </div>
    <button @click="handleClick">Logout</button>
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
  position: sticky;
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
  padding: .5rem;
  background: #2580F7;
  cursor: pointer;
  border-radius: .5rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}
</style>