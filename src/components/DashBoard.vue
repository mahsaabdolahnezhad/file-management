<!-- src/components/DashBoard.vue -->
<template>
 <div class="container">
    <header class="header">
      <div class="header-content">
        <button class="menu-button" @click="toggleNavigation"><i class="fas fa-bars"></i></button>
        <div class="username">{{ username }}</div>
      </div>
      <nav :class="{ 'open': isNavigationOpen }">
        <ul>
          <li @click="navigateToRoute('RouteIndex1')">User Management</li>
          <li @click="navigateToRoute('RouteIndex2')">Manage User groups</li>
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
      isNavigationOpen: true,
     username: ' ',
    };
  },
    created() {
    // Retrieve the username from the route's query parameter
    this.username = this.$route.query.username || 'Guest';
  },
  methods: {
   navigateToRoute(routeName) {
    this.$router.push({ name: routeName });
  },
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  color: #fff;
}

.menu-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
}

.username {
  margin-right: 10px;
  color:black;
}

.header-content {
  display: flex;
  align-items: center;
}


nav {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  width: 200px;
   height: calc(100vh - 60px);
  background-color: black;
  border-right: 1px solid #ccc;
  border-radius: 12px;
  padding: 60px;
  z-index: 1000; /* Ensure it's above other content */
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
li:hover{
cursor: pointer;
background:#eea1eb;
}

.content {
 flex-grow: 1;
  padding: 20px;
}

.footer {
position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
   z-index: 1000;
  padding: 20px;
  color: white;
}

</style>