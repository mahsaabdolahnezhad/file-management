<template>
  <div class="page-container">
    <div class="frame">
      <div class="table-container">
          <button class="add-row-button" @click="showAddDialog">Add Row</button>
         <button class="update-row-button" @click="openEditDialog">Update Rows</button>
         

        <div class="scrollable-table">
          <table class="styled-table">
                 <thead>
        <tr>
         <th>update</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Type</th>
          <th>User Group</th>
          <th>Creater</th>
          <th>Creation Time</th>
          <th>Last Modifier</th>
          <th>Last Modification Time</th>
          <th>delete</th>
         
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
    
    <!-- Add Row Dialog -->
    <div v-if="isAddDialogVisible" class="dialog-overlay">
      <div class="add-dialog">
        <h2 class="add-dialog-title">Add Row</h2>
        <form @submit.prevent="addRow" class="add-form">
            <label for="username">Username:</label>
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
          <label for="firstname">First Name:</label>
          <input
            id="firstname"
            v-model="rowData.firstname"
            :maxlength="48"
            class="styled-input"
          />
          
          <!-- Last Name -->
          <label for="lastname">Last Name:</label>
          <input
            id="lastname"
            v-model="rowData.lastname"
            :maxlength="48"
            class="styled-input"
          />
          
          <!-- Type -->
          <label for="type">Type:</label>
          <select id="type" v-model="rowData.type" required  class="styled-select">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          
          <!-- User Group -->
          <label for="usergroup">User Group:</label>
          <input
            id="usergroup"
            v-model="rowData.usergroup"
            class="styled-input"
          />
            <div v-if="showWarningMessage" class="warning-message">
      Username already exists! Please choose a different username.
    </div>
          <div class="dialog-buttons">
          <button type="submit" class="dialog-button add-button">Add</button>
          <button @click="closeAddDialog" class="dialog-button cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  <div v-if="isEditDialogVisible" class="dialog-overlay">
  <div class="add-dialog">
    <h2 class="add-dialog-title">Edit Row</h2>
    <form @submit.prevent="editRow" class="add-form">
      <!-- Input fields for editing -->
      <label for="edit-firstname">First Name:</label>
      <input
        id="edit-firstname"
        v-model="editedRow.firstname"
        :maxlength="48"
        class="styled-input"
      />
            <label for="edit-lastname">Last Name:</label>
      <input
        id="edit-firstname"
        v-model="editedRow.lastname"
        :maxlength="48"
        class="styled-input"
      />
        <label for="edit-type">Type:</label>
  <select id="edit-type" v-model="editedRow.type" required  class="styled-select">
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>
  
  <label for="edit-usergroup">User Group:</label>
  <input
    id="edit-usergroup"
    v-model="editedRow.usergroup"
    class="styled-input"
  />
      <div class="dialog-buttons">
        <button type="submit" class="dialog-button add-button">Update</button>
        <button @click="closeEditDialog" class="dialog-button cancel-button">Cancel</button>
      </div>
    </form>
  </div>
</div>


      <div v-if="confirmDeleteIndex !== null" class="confirmation-message">
      <div class="confirmation-box">
       <div class="confirmation-text">
          Are you sure you want to delete this row?
        </div>
        <div class="confirmation-buttons">
          <button class="confirm" @click="deleteRow(confirmDeleteIndex)">Confirm</button>
          <button class="cancel" @click="cancelDelete">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
mounted() {
    // Load data from session storage
    const data = window.sessionStorage.getItem('tableData');

    if (data) {
      this.tableData = JSON.parse(data); // Parse the JSON string back to an object
    }
  },
 computed: {
    ...mapState(['username']), // Map the shared username from the store
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
        showWarningMessage: false
       
    };
  },

  methods: {
      clearSessionStorage() {
      // Remove a specific item
      window.sessionStorage.removeItem('tableData');
      
      // OR clear all session storage
      // window.sessionStorage.clear();
    },
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
    selectedRow.lastModifier = this.username;
    selectedRow.lastModificationTime = currentTime;


   sessionStorage.setItem('tableData', JSON.stringify(this.tableData));
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

    deleteRow(index) {
      this.tableData.splice(index, 1);

       sessionStorage.setItem('tableData', JSON.stringify(this.tableData));
      this.confirmDeleteIndex = null;
    },
    showAddDialog() {
      this.isAddDialogVisible = true;
    },
    closeAddDialog() {
      this.isAddDialogVisible = false;
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

      this.closeAddDialog();

       const dataToSave = JSON.stringify(this.tableData); // Convert your data to a JSON string
  window.sessionStorage.setItem('tableData', dataToSave);
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





