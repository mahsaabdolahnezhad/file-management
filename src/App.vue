<template>
 <div id="app" :class="selectedTheme">
  <router-view :key="$route.fullPath" :selectedTheme="selectedTheme" />
    <ThemeSwitcher v-if="$route.name === 'Dashboard'"  :initialTheme="selectedTheme" @theme-changed="changeTheme" />
  </div>
</template>

<script>
import ThemeSwitcher from './components/ThemeSwitcher.vue';

export default {
  name: 'App',
  components: {
   ThemeSwitcher,
  },
    data() {
    return {
      selectedTheme: 'theme-purple', // Default theme
    };
  },
    created() {
    // Retrieve the logged-in user
    const loggedInUser = localStorage.getItem('virtualLoggedInUser');
    if (loggedInUser) {
      // Retrieve the selected theme for the logged-in user from localStorage
      const userTheme = localStorage.getItem(`${loggedInUser}_theme`);
      if (userTheme) {
        // Apply the selected theme globally
        this.selectedTheme = userTheme;
      }

     
    }
  },
  methods: {
    changeTheme(theme) {
      // Update the selected theme globally
     // Update the selected theme globally
      this.selectedTheme = theme;
  // Save the selected theme in localStorage for the current user
      const loggedInUser = localStorage.getItem('virtualLoggedInUser');
      if (loggedInUser) {
        localStorage.setItem(`${loggedInUser}_theme`, theme);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 /*background: linear-gradient(to right, rgb(151, 150, 240), rgb(251, 199, 212));  */
  min-height: 100vh;
  
    background-color: var(background, purple); 
}
body {
  margin: 0;
  padding: 0;
}



/* styles.css or your stylesheet */
.theme-purple {
background: linear-gradient(to right, rgb(151, 150, 240), rgb(251, 199, 212));
}


.theme-blue {
background: radial-gradient(circle at 22.4% 21.7%, rgb(4, 189, 228) 0%, rgb(2, 83, 185) 100.2%);
}

.theme-green {
background: radial-gradient(circle at -1% 57.5%, rgb(19, 170, 82) 0%, rgb(0, 102, 43) 90%);
}

.theme-red {
background: linear-gradient(108.4deg, rgb(253, 44, 56) 3.3%, rgb(176, 2, 12) 98.4%);
}

</style>



