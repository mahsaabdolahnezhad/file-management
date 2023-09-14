<!-- src/components/DashBoard.vue -->
<template>
 <div class="container" >
    <header class="header">
      <div class="header-content">
        <button class="menu-button" @click="toggleNavigation"><i class="fas fa-bars"></i></button>
        <div class="username">{{ username }}
      
        </div>
      </div>
      <nav :class="{ 'open': isNavigationOpen }">
        <ul>
   <ul>
          <li @click="navigateToRoute('RouteIndex1')">{{ $t('dashboard.userManagement') }}</li>
          <li @click="navigateToRoute('RouteIndex2')">{{ $t('dashboard.manageUserGroups') }}</li>
          <li>{{ $t('dashboard.storageSpace') }}</li>
          <li>{{ $t('dashboard.fileManagement') }}</li>
        </ul>
        </ul>
   <select v-model="selectedUsername" @change="virtualLogin"  class="select-box">
  <option selected="selected">artyabd</option>
  <option v-for="username in usernames" :key="username" :value="username">{{ username }}</option>
</select>

      </nav>

    </header>
    <main class="content">

    </main>
    <footer class="footer">
    <div  class="theme-selector-container">
        <label for="language-selector">{{ $t('dashboard.selectLanguage') }}</label>
        <select id="language-selector" v-model="selectedLanguage" @change="changeLanguage(selectedLanguage)">
          <option value="en">{{ $t('dashboard.english') }}</option>
          <option value="fa">{{ $t('dashboard.persian') }}</option>
        </select>
      </div>

    </footer>
  </div>


</template>

<script>
import i18n from '@/i18n';

export default {
  name: 'DashBoard',
   props: {
    selectedTheme: String, // Receive the selected theme as a prop
  },
 i18n,
    data() {
    return {
      isNavigationOpen: true,
     username: ' ',
      selectedLanguage: 'en', 
       selectedUsername: '',
      tableData: [], 
     localSelectedTheme: 'theme-purple', 
    };
  },
    created() {
     const savedUsername = localStorage.getItem('virtualLoggedInUser');
    if (savedUsername) {
      this.username = savedUsername;
    }

    const savedLanguage = localStorage.getItem(`${savedUsername}_language`);
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
       this.$i18n.locale = savedLanguage;
    }

    // Retrieve the selected theme for the logged-in user from localStorage
    const userTheme = localStorage.getItem(`${savedUsername}_theme`);
    if (userTheme) {
      // Apply the selected theme globally
      this.localSelectedTheme = userTheme;
    }
    
    const data = window.sessionStorage.getItem('tableData');

    if (data) {
      this.tableData = JSON.parse(data);
    }
  },
  computed: {
  usernames() {
    // Extract usernames from the tableData array
    const usernames = this.tableData.map(row => row.username);
    return Array.from(new Set(usernames)); // Use Set to remove duplicates
  },
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

    changeLanguage() {
      // Use vue-i18n to change the active locale based on selectedLanguage
      this.$i18n.locale = this.selectedLanguage;

         localStorage.setItem(`${this.username}_language`, this.selectedLanguage);
    }, 
    virtualLogin() {
   const selectedUsername = this.selectedUsername;

  if (selectedUsername) {
    this.username = selectedUsername;

    // Retrieve and apply the saved language preference for the selected user

   const userLanguage = localStorage.getItem(`${selectedUsername}_language`);
        if (userLanguage) {
          this.selectedLanguage = userLanguage;
          this.$i18n.locale = userLanguage;
        }
        
 
        // Retrieve and apply the saved theme preference for the selected user
        const userTheme = localStorage.getItem(`${selectedUsername}_theme`);
        if (userTheme) {
          this.localSelectedTheme = userTheme; // Update the local data property
        }
    // Save the selected username in localStorage
    localStorage.setItem('virtualLoggedInUser', selectedUsername);
  }
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

}

.theme-selector-container {
  position: absolute;
  top:0;
  right: 50px;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: antiquewhite;

}

#language-selector {
  /* Styles for the select element with the "language-selector" ID */
    background-color: transparent;/* Light pink background color */
  color: black; /* White text color */
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
   margin-top: -10px;
}

#language-selector option {
  /* Styles for the select options */
   background-color: rgb(209, 151, 190);
  color: black; /* White text color */
  border: none;
  border-radius: 5px;
   top: -30px;
}

#language-selector option:hover {
  /* On hover, change the select option background */
  background-color: #ffa69e; /* Slightly darker pink on hover */
}

.select-box {
   background-color: antiquewhite;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: -10px; /* Adjust as needed */
}

/* Style for option elements */
.select-box option {
  background-color: #fff;
  color: #333;
  font-size: 16px;
}

/* Hover effect for options */
.select-box option:hover {
  background-color: #eee;
}

/* Style for the selected option */
.select-box option:checked {
  background-color: #eea1eb;
}

</style>