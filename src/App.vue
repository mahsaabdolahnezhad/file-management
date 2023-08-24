<template>
  <div id="app" class="app-container">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
   
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
 background: linear-gradient(to right, rgb(151, 150, 240), rgb(251, 199, 212));
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}

</style>
