<template>
  <div class="login">
    <header>
      <h3>POST<span>APP</span></h3>
      <h4>Login</h4>
    </header>
    <form @submit.prevent="handleSubmit">
      <input type="email" required placeholder="email" v-model="email">
      <input type="password" required placeholder="password" v-model="password">
      <button>Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
    <footer>
      <p>No account yet? <router-link :to="{ name: 'Signup' }" class="link">Signup</router-link></p>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    async handleSubmit(){
      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      if(!this.error){
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
header {
  margin-top: 1.5rem;
}
h3 {
  color: #000;
  font-size: 2.8rem;
  text-align: center;
  font-weight: 900;
}
h4 {
  color: #888;
  font-size: 2.4rem;
  text-align: center;
  font-weight: 300;
  margin: 1rem 0;
}
span {
  font-weight: 300;
}
form {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2.5rem;
}
@media(min-width: 768px) {
  form {
    align-self: center;
    width: 65rem;
  }
}
form input {
  border: none;
  outline: none;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #eee;
}
form input:focus {
  border: 1px solid #aaa;
}
form button {
  border: none;
  outline: none;
  padding: 1rem;
  background: #2580F7;
  cursor: pointer;
  border-radius: .5rem;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
}
.error {
  color: rgb(243, 35, 35);
  text-align: center;
  padding: 1rem;
  font-size: 1.4rem;
}
footer {
  width: 100%;
  height: 6rem;
  background: rgb(241, 241, 241);
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
}
footer p {
  color: #888;
  text-align: center;
  font-size: 1.8rem;
}
.link {
  color: #2580F7;
  text-decoration: none;
}
</style>