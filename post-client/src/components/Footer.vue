<template>
  <div class="footer">
    <button @click="goto('/')">
      <span class="material-icons">home</span>
    </button>
    <button @click="goto('/addPost')">
      <span class="material-icons">photo_camera</span>
    </button>
    <button @click="goto('/profile')">
      <span class="material-icons">person</span>
    </button>
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
</style>