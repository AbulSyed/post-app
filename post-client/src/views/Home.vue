<template>
  <div class="home">
    <button @click="handleClick">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(){
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
