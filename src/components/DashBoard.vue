<!-- src/components/DashBoard.vue -->
<template>
 <div class="container">
    <header class="header">
      <div class="header-content">
        <button class="menu-button" @click="toggleNavigation">☰</button>
        <div class="username">{{ username }}</div>
      </div>
      <nav :class="{ 'open': isNavigationOpen }">
        <button class="exit-button" @click="closeNavigation">✖</button>
        <ul>
          <li>مدیریت کاربران</li>
          <li>مدیریت گروه های کاربری </li>
          <li>فضای ذخیره سازی</li>
          <li>مدیریت فایل ها</li>
        </ul>
      </nav>
    </header>
    <main class="content">
      content
    </main>
    <footer class="footer">
     footer
    </footer>
  </div>


</template>

<script>
export default {
  name: 'DashBoard',
    data() {
    return {
      isNavigationOpen: false,
     username: ' ',
    };
  },
    created() {
    // Retrieve the username from the route's query parameter
    this.username = this.$route.query.username || 'Guest';
  },
  methods: {
    toggleNavigation() {
      this.isNavigationOpen = !this.isNavigationOpen;
    },
    closeNavigation() {
      this.isNavigationOpen = false;
    },
  },
};
</script>



<style scoped>

container{
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.header {
  background-color: #c3bef0;
}

.header-content {
  display: flex;
  align-items: center;
}

.menu-button,
.exit-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding:20px;
}

.username {
  margin-left: 10px;
}

nav {
  display: none;
  position: absolute;
  top: 50px;
  right: 10px;
  background-color: #cca8e9;
  border: 1px solid #ccc;
  border-radius:5px;
  padding: 60px;
}

nav.open {
  display: block;
}

ul {
  list-style: none;
  padding:10px;
  margin: 0;
}

li {
  margin-bottom: 10px;
  padding:10px;
  cursor: pointer;
}

.content {
 flex-grow: 1;
  padding: 20px;
}

.footer {
position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: #c3bef0;
  color: white;
}

</style>