<template>
        <!-- Add Row Dialog -->
    <div v-if="isAddDialogVisible" class="dialog-overlay">
      <div class="add-dialog">
      <h2 class="add-dialog-title">{{ $t('RouteIndex1.addRowTitle') }}</h2>
        <form @submit.prevent="addRow" class="add-form">
           <label for="username">{{ $t('RouteIndex1.usernameLabel') }}:</label>
          <input
            id="username"
            v-model="rowData.username"
            :disabled="editing"
            required
            :maxlength="48"
            :minlength="5"
            class="styled-input"
          />
           <!-- First Name -->
          <label for="firstname" >{{ $t('RouteIndex1.firstName') }}:</label>
          <input
            id="firstname"
            v-model="rowData.firstname"
            :maxlength="48"
            class="styled-input"
          />
          
          <!-- Last Name -->
          <label for="lastname">{{ $t('RouteIndex1.lastName') }}:</label>
          <input
            id="lastname"
            v-model="rowData.lastname"
            :maxlength="48"
            class="styled-input"
          />
          
          <!-- Type -->
          <label for="type">{{ $t('RouteIndex1.type') }}:</label>
          <select id="type" v-model="rowData.type" required  class="styled-select">
            <option value="admin">{{ $t('RouteIndex1.admin') }}</option>
            <option value="user">{{ $t('RouteIndex1.user') }}</option>
          </select>
          
          <!-- User Group -->
          <label for="usergroup">{{ $t('RouteIndex1.userGroup') }}:</label>
<select id="usergroup" v-model="rowData.usergroup" class="styled-select">
  <option v-for="name in namesFromRoute2" :value="name" :key="name">{{ name }}</option>
</select>

            <div v-if="showWarningMessage" class="warning-message">
    {{ $t('RoueIndex1.usernameExists') }}
    </div>
          <div class="dialog-buttons">
           <button type="submit" class="dialog-button add-button">{{ $t('RouteIndex1.addButton') }}</button>
                <button @click="closeAddDialog" class="dialog-button cancel-button">{{ $t('RouteIndex1.cancelButton') }}</button>
          </div>
        </form>
      </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
    
      data() {
    return {
      rowData: {
        username: '',
        firstname: '',
        lastname: '',
        type: '',
        usergroup: ''
      },
   
      isAddDialogVisible: this.isAddDialogVisible,
        uniqueUsernames: new Set(),
        showWarningMessage: this.showWarningMessage,
 
}
      },
props: {
  namesFromRoute2: Array,
  showWarningMessage: Boolean,
  isAddDialogVisible: Boolean,
},
      created(){
        this.$emit('.uniqueUsernames', this.getUsernames());
      },
       computed: {
    ...mapState(['username',]), 
     namesFromRoute2() {
    return this.$store.state.namesFromRoute2;
  },
  usernamesFromRoute2() {
    return this.$store.state.username;
  },
  
  },
      methods:{
     showAddDialog() {
      this.isAddDialogVisible = true;
      
    },
    closeAddDialog() {
      this.isAddDialogVisible = false;
      this.clearInputFields();
        this.$emit('close');
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
      this.rowData = {
        username: '',
        firstname: '',
        lastname: '',
        type: '',
        usergroup: ''
      };
    },
},
    };


</script>