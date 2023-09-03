<template>
<div class="container">
  <div class="login-container">
    <h2 class="login-title">Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="username" type="text" placeholder="Username" />
    <div class="password-input">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" />
        <button @click="togglePasswordVisibility" type="button" class="password-toggle-btn">
          <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
        </button>
      </div>
      <button type="submit" class="login-button" >Login</button>
       <p v-if="showErrorMessage" class="error-message">Invalid username or password</p>
    </form>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
       showErrorMessage: false,
    };
  },
  methods: {
    login() {
      // Perform authentication logic here
      const correctUsername = 'artyabd';
      const correctPassword = '13801122';
      if (this.username === correctUsername && this.password === correctPassword) {
        this.$store.commit('setUsername', this.username);
      this.$router.push({ path: '/dash', query: { username: this.username } });
      } else {
        // Failed login logic
         this.showErrorMessage = true;
      }
    },
   togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}



.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
 max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  padding-bottom:100px;
  padding-right:50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow:5px 5px 15px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-form .login-button  {
  width: 40%;
  padding: 10px;
  background-color: #cca8e9;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-form .login-button  button:hover {
  background-color: #0056b3;
}

.password-input {
  position: relative;

}

.password-toggle-btn {
  position: absolute;
  right:-16px;
  top: 40%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
}

.password-toggle-btn i {
  font-size: 18px;
}
.error-message {
  color: red;
  font-size: 14px;
}

</style>