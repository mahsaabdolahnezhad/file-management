<template>
  <div class="page-container">
    <div class="frame">
      <div class="table-container">
        <button class="add-row-button" @click="showAddDialog">{{ $t('UserManage.addRow') }}</button>
        <button class="update-row-button" @click="openEditDialog">{{ $t('UserManage.updateRows') }}</button>


        <div class="scrollable-table">
          <table class="styled-table">
                 <thead>
        <tr>
       <th>{{ $t('UserManage.update') }}</th>
                <th>{{ $t('UserManage.username') }}</th>
                <th>{{ $t('UserManage.firstName') }}</th>
                <th>{{ $t('UserManage.lastName') }}</th>
                <th>{{ $t('UserManage.type') }}</th>
                <th>{{ $t('UserManage.userGroup') }}</th>
                <th>{{ $t('UserManage.creater') }}</th>
                <th>{{ $t('UserManage.creationTime') }}</th>
                <th>{{ $t('UserManage.lastModifier') }}</th>
                <th>{{ $t('UserManage.lastModificationTime') }}</th>
                <th>{{ $t('UserManage.delete') }}</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
           <div class="checkbox-container">
          
                <td ><input type="checkbox" v-model="row.selected"  class="checkbox-input" :checked="index === selectedRowIndex"  @click="selectRow(index)"/></td>

                </div>
          <td>{{ row.username }}</td>
          <td>{{ row.firstname }}</td>
          <td>{{ row.lastname }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.usergroup }}</td>
          <td>{{ row.creater }}</td>
          <td>{{ row.creationTime }}</td>
          <td>{{ row.lastModifier }}</td>
          <td>{{ row.lastModificationTime }}</td>
          <td>
                  <span @click="confirmDelete(index)" class="delete-icon">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                </td>
        </tr>
      </tbody>
          </table>
        </div>
      </div>
    </div>
    

    <add-user
    :is-add-dialog-visible="isAddDialogVisible"
    :row-data.sync="rowData"
    :usernames="usernames"
    @close-add-dialog="closeAddDialog"
    @add-row="handleAddRow"
    @update:row-data="updateRowData"
></add-user>




  <div v-if="isEditDialogVisible" class="dialog-overlay">
  <div class="add-dialog">
       <h2 class="add-dialog-title">{{ $t('UserManage.editRowTitle') }}</h2>
    <form @submit.prevent="editRow" class="add-form">
      <!-- Input fields for editing -->
  <label for="edit-firstname">{{ $t('UserManage.firstName') }}:</label>
      <input
        id="edit-firstname"
        v-model="editedRow.firstname"
        :maxlength="48"
        class="styled-input"
      />
<label for="edit-lastname">{{ $t('UserManage.lastName') }}:</label>
      <input
        id="edit-firstname"
        v-model="editedRow.lastname"
        :maxlength="48"
        class="styled-input"
      />
       <label for="edit-type">{{ $t('UserManage.type') }}:</label>
  <select id="edit-type" v-model="editedRow.type" required  class="styled-select">
    <option value="admin">{{ $t('UserManage.admin') }}</option>
            <option value="user">{{ $t('UserManage.user') }}</option>
  </select>
  
    <label for="edit-usergroup">{{ $t('UserManage.userGroup') }}:</label>
<select id="usergroup" v-model="editedRow.usergroup" class="styled-select">
  <option v-for="name in namesFromRoute2" :value="name" :key="name">{{ name }}</option>
</select>
      <div class="dialog-buttons">
        <button type="submit" class="dialog-button add-button">{{ $t('UserManage.updatebutton') }}</button>
        <button @click="closeEditDialog" class="dialog-button cancel-button">{{ $t('UserManage.cancelButton') }}</button>
      </div>
    </form>
  </div>
</div>


      <div v-if="confirmDeleteIndex !== null" class="confirmation-message">
      <div class="confirmation-box">
       <div class="confirmation-text">
         {{ $t('UserManage.deleteConfirmation') }}
        </div>
        <div class="confirmation-buttons">
          <button class="confirm" @click="deleteRow(confirmDeleteIndex)">{{ $t('UserManage.confirm') }}</button>
          <button class="cancel" @click="cancelDelete">{{ $t('UserManage.cancel') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState , mapActions , mapMutations } from 'vuex';
import AddUser from "@/components/AddUser";

export default {
    components: {
    AddUser,
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
  data() {
    return {
     selectedRowIndex: -1, 
    isEditDialogVisible: false,
    editedRow: {
      firstname: '',
      lastname: '',
      type: '',
      usergroup: '',
    },
      rowData: {
        username: '',
        firstname: '',
        lastname: '',
        type: '',
        usergroup: ''
      },
      tableData: [],
      isEditing: false,
      isAddDialogVisible: false,
       confirmDeleteIndex: null,
        uniqueUsernames: new Set(),
        showWarningMessage: false,
     selectedUser: '',
       
    };
  },
 
created() {
  // Try loading data from session storage
  const tableDataJSON = window.sessionStorage.getItem('tableData');
  if (tableDataJSON) {
    const tableData = JSON.parse(tableDataJSON);
    this.tableData = tableData; // Initialize tableData with the loaded data
  } else {
    this.tableData = this.$store.state.tableData; // Initialize with Vuex data if session storage is empty
  }


  // Emit an event with the usernames
  this.$emit('.uniqueUsernames', this.getUsernames());
  
  
},



  methods: {
     ...mapMutations(['setTableData']),
      ...mapActions(['setUsernames']),
  

 selectRow(index) {
  // Deselect all rows
  this.tableData.forEach((row) => {
    row.selected = false;
  });

  // Select the clicked row
  this.tableData[index].selected = true;

  // Update the selectedRowIndex
  this.selectedRowIndex = index;
},

   openEditDialog() {
    // Find the index of the first selected row
    const selectedIndex = this.tableData.findIndex((row) => row.selected);

    if (selectedIndex !== -1) {
      // Store the selected row's index and data for editing
      this.selectedRowIndex = selectedIndex;
      this.editedRow = { ...this.tableData[selectedIndex] };

      // Show the edit dialog
      this.isEditDialogVisible = true;
    }
  },

  closeEditDialog() {
    // Close the edit dialog and reset data
    this.isEditDialogVisible = false;
    this.selectedRowIndex = null;
    this.clearEditFields();
  },

  editRow() {
   if (this.selectedRowIndex !== -1){
    const currentTime = new Date();

    // Update the selected row's data
    const selectedRow = this.tableData[this.selectedRowIndex];
    selectedRow.firstname = this.editedRow.firstname;
    selectedRow.lastname = this.editedRow.lastname;
    selectedRow.type = this.editedRow.type;
    selectedRow.usergroup = this.editedRow.usergroup;
    selectedRow.lastModifier = this.user;
    selectedRow.lastModificationTime = currentTime;

    this.setTableData(this.tableData);

    // Close the edit dialog and reset data
    this.closeEditDialog();
    }
  },

  clearEditFields() {
    // Reset the edited row's data
    this.editedRow = {
      firstname: '',
      lastname: '',
      type: '',
      usergroup: '',
    };
  },
  confirmDelete(index) {
      this.confirmDeleteIndex = index;
      
    },

    cancelDelete() {
      this.confirmDeleteIndex = null;
    },
      selectUsername(username) {
    this.$root.$emit('userSelected', username);
  },
 getUsernames() {
      // Retrieve the tableData from session storage
      const tableDataJSON = window.sessionStorage.getItem('tableData');

      // Initialize an empty array to store usernames
      const usernames = [];

      if (tableDataJSON) {
        // Parse the tableData JSON
        const tableData = JSON.parse(tableDataJSON);
 
        // Extract usernames from the tableData
        tableData.forEach((row) => {
          if (row.username) {
            usernames.push(row.username);
          }
        });
      }

      return usernames;
    },
    deleteRow(index) {
      this.tableData.splice(index, 1);

      this.confirmDeleteIndex = null;
         this.setTableData(this.tableData);
    },
    showAddDialog() {
      this.isAddDialogVisible = true;
    },
    closeAddDialog() {
      this.isAddDialogVisible = false;
      this.clearInputFields();
    },
       handleAddRow(newRow) {
        this.tableData.push(newRow);
        sessionStorage.setItem("tableData", JSON.stringify(this.tableData)); // Save in session storage
        this.isAddDialogVisible = false; 
    },
    updateRowData(newData) {
        this.rowData = newData;
    },

    clearInputFields() {
      this.rowData = {
        username: '',
        firstname: '',
        lastname: '',
        type: '',
        usergroup: ''
      };
    }
    
  }
};
</script>



<style>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.frame {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.table-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Add Row and Update Row buttons */
.add-row-button,
.update-row-button {
  align-self: center;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #9b59b6; /* Purple color */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
  outline: none;
}

.add-row-button:hover,
.update-row-button:hover {
  background-color: #8e44ad; /* Darker shade on hover */
}

/* Table */
.scrollable-table {
  flex: 1; /* Allow the table to expand vertically */
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(100% - 40px);
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.styled-table th,
.styled-table td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.styled-table th {
  background-color: #f2f2f2;
}

.styled-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.styled-table tr:hover {
  background-color: #e0e0e0;
}

/* Buttons in dialogs */
.dialog-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
  outline: none;
}

.add-button {
  background-color: #51a0e3;
  color: #ffffff;
}

.add-button:hover {
  background-color: #4283b7;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333333;
  margin-right: 10px;
}

.cancel-button:hover {
  background-color: #dcdcdc;
}

/* Delete icon */
.delete-icon {
  cursor: pointer;
  color: #e74c3c; /* Red color */
  transition: color 0.3s;
}

.delete-icon:hover {
  color: #c0392b; /* Darker red on hover */
}

/* Confirmation dialog */
.confirmation-message {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  color: #ffffff;
}

.confirmation-box {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: black;
}

.confirmation-text {
  margin-bottom: 10px;
}

.confirmation-buttons {
  margin-top: 10px;
}

.confirmation-buttons button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
  outline: none;
}

.confirmation-buttons button.confirm {
  background-color: #e74c3c;
  color: #ffffff;
}

.confirmation-buttons button.confirm:hover {
  background-color: #c0392b;
}

.confirmation-buttons button.cancel {
  background-color: #f0f0f0;
  color: #333333;
}

.confirmation-buttons button.cancel:hover {
  background-color: #dcdcdc;
}

/* Add and Edit Row dialogs */
.add-dialog,
.edit-dialog {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

.add-dialog-title,
.edit-dialog-title {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.styled-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.styled-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpolygon points='5,6 10,13 15,6'%3E%3C/polygon%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}

.styled-select:focus {
  outline: none;
  border-color: #51a0e3; /* Change to your desired focus color */
}

.warning-message {
  color: #e74c3c;
  margin-top: 10px;
  font-size: 14px;
}

.add-form {
  display: flex;
  flex-direction: column;
  padding: 40px;;
}

/* Checkbox styling */
.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-label {
  margin-left: 10px;
  font-size: 14px;
  color: #333;
}

.checkbox-input {
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #333;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

.checkbox-input:checked {
  background-color: #333;
  border-color: #333;
}

.checkbox-input:checked::after {
  content: "\2713";
  font-size: 16px;
  color: #fff;
  display: block;
  text-align: center;
  line-height: 18px;
}

/* Other styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}


</style>




