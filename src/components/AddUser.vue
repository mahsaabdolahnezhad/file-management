<template>
        <!-- Add Row Dialog -->
    <div v-if="isAddDialogVisible" class="dialog-overlay">
      <div class="add-dialog">
      <h2 class="add-dialog-title">{{ $t('UserManage.addRowTitle') }}</h2>
        <form @submit.prevent="addRow" class="add-form">
           <label for="username">{{ $t('UserManage.usernameLabel') }}:</label>
          <input
            id="username"
            v-model="localUsername"
            :disabled="false"
            required
            :maxlength="48"
            :minlength="5"
            class="styled-input"
          />
           <!-- First Name -->
          <label for="firstname" >{{ $t('UserManage.firstName') }}:</label>
          <input
            id="firstname"
            v-model="localFirstname"
            :maxlength="48"
            class="styled-input"
          />
          
          <!-- Last Name -->
          <label for="lastname">{{ $t('UserManage.lastName') }}:</label>
          <input
            id="lastname"
            v-model="localLastname"
            :maxlength="48"
            class="styled-input"
          />
          
          <!-- Type -->
          <label for="type">{{ $t('UserManage.type') }}:</label>
          <select id="type" v-model="localType" required  class="styled-select">
            <option value="admin">{{ $t('UserManage.admin') }}</option>
            <option value="user">{{ $t('UserManage.user') }}</option>
          </select>
          
          <!-- User Group -->
          <label for="usergroup">{{ $t('UserManage.userGroup') }}:</label>
<select id="usergroup" v-model="localUsergroup" class="styled-select">
  <option v-for="name in namesFromRoute2" :value="name" :key="name">{{ name }}</option>
</select>

            <div v-if="showWarningMessage" class="warning-message">
    {{ $t('RoueIndex1.usernameExists') }}
    </div>
          <div class="dialog-buttons">
           <button type="submit" class="dialog-button add-button">{{ $t('UserManage.addButton') }}</button>
                <button @click="closeAddDialog" class="dialog-button cancel-button">{{ $t('UserManage.cancelButton') }}</button>
          </div>
        </form>
      </div>
    </div>
</template>


<script>
export default{
    props:{
     isAddDialogVisible: Boolean,
     rowData: Object,
    usernames: Array,
    },
data(){
    return{
   tableData:[],
  localUsername:'',
      localRow :[],
      localFirstname:'',
      localLastname:'',
      localType:'',
      localUsergroup:'',
    };
  },
  mounted() {
    // When the component is mounted, set the initial values
    this.localUsername = this.rowData.username;
      this.localFirstname = this.rowData.firstname;
      this.localLastname = this.rowData.lastname;
      this.localType= this.rowData.type;
    this.localUsergroup = [...this.rowData.usergroup];
    this.localRow = Object.assign({}, this.rowData);
  },
  watch: {
    // Watch for changes in local data and update the prop when changes occur
    localUsername(newVal) {
      this.$emit('update:rowData', { ...this.rowData, username: newVal });
    },
    localFirstname(newVal) {
      this.$emit('update:rowData', { ...this.rowData, firstname: newVal });
    },
       localLastname(newVal) {
      this.$emit('update:rowData', { ...this.rowData, lastname: newVal });
    },
       localType(newVal) {
      this.$emit('update:rowData', { ...this.rowData, type: newVal });
    },
       localUsergroup(newVal) {
      this.$emit('update:rowData', { ...this.rowData, usergroup: newVal });
    },
  },
  methods: {
    closeAddDialog() {
      this.$emit('close-add-dialog');
      this.clearInputFields();
    },

    addRow() {
      // Validate form inputs
      if (!this.validateForm()) {
        return;
      }
      const newUsername = this.rowData.username;

  // Check if the username is already in the uniqueUsernames set
  if (this.uniqueUsernames.has(newUsername)) {
   this.showWarningMessage = true; // Add a data property for showing the warning message
    return;
  }
      // Populate default attributes
      const newRow = {
        username: this.rowData.username,
        firstname: this.rowData.firstname || '',
        lastname: this.rowData.lastname || '',
        type: this.rowData.type,
        usergroup: this.rowData.usergroup || '',
         creater: this.username,
        creationTime: new Date(),
        lastModifier:this.username,
        lastModificationTime: new Date()
      };
        this.uniqueUsernames.add(newUsername);
      // Add the new row to the tableData array
      this.tableData.push(newRow);
    this.setTableData(this.tableData);
     this.$emit('add-row', newRow); 
      this.closeAddDialog();
 
   this.$emit('.uniqueUsernames', this.getUsernames());
     this.setUsernames(this.getUsernames());
    
    },
      initializeTableData() {
      // Try loading data from session storage
      const tableDataJSON = window.sessionStorage.getItem('tableData');
      if (tableDataJSON) {
        const tableData = JSON.parse(tableDataJSON);
        this.setTableData(tableData);
      } else {
        this.setTableData([]); // Initialize with an empty array if not available
      }
    },

    
         validateForm() {
      let isValid = true;

      if (!this.rowData.username || this.rowData.username.length < 5 || this.rowData.username.length > 48) {
        // Invalid username
        isValid = false;
      }

      if (!this.rowData.type) {
        // Type is mandatory
        isValid = false;
      }

      return isValid;

    },


    clearInputFields() {
      this.$emit('close-add-dialog');
      this.$emit('clear-input-fields');
    },
    
  }
};

</script>