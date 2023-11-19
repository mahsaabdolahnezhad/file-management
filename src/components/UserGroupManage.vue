<template>
  <div class="page-container">
    <div class="frame">
      <div class="table-container">
        <button class="add-row-button" @click="showAddDialog">
          {{ $t("UserGroupManage.addRow") }}
        </button>
     
        <div class="scrollable-table">
          <table class="styled-table">
            <thead>
              <tr>
                <th>{{ $t("UserGroupManage.name") }}</th>
                <th>{{ $t("UserGroupManage.user") }}</th>
                <th>{{ $t("UserGroupManage.creator") }}</th>
                <th>{{ $t("UserGroupManage.creationTime") }}</th>
                <th>{{ $t("UserGroupManage.lastModifier") }}</th>
                <th>{{ $t("UserGroupManage.lastModificationTime") }}</th>
                <th>{{ $t("UserGroupManage.update&delete") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in tableData2" :key="index">
    
                <td>{{ row.name }}</td>
                <td>{{ row.user }}</td>
                <td>{{ row.creator }}</td>
                <td>{{ row.creationTime }}</td>
                <td>{{ row.lastModifier }}</td>
                <td>{{ row.lastModificationTime }}</td>
                <td>
                   <!-- Edit Icon -->
            <span @click="openEditDialog(index)" class="edit-icon">
              <i class="fas fa-edit"></i>
            </span>
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



    <add-usergroup
    :is-add-dialog-visible="isAddDialogVisible"
    :usernames="usernames"
    :table-data2="tableData2"
    @close-add-dialog="closeAddDialog"
    @add-row="handleAddRow"
    @update:row-data="updateRowData"
></add-usergroup>

<edit-usergroup
    v-if="isEditDialogVisible"
      :is-edit-dialog-visible="isEditDialogVisible"
    :usernames="usernames"
     :table-data2="tableData2"
    @close-edit-dialog="closeEditDialog"
    @edit-row="handleEditRow"
    @update:edited-row="updateEditedRow">
</edit-usergroup>


    <!-- Delete Confirmation Dialog -->
    <div v-if="confirmDeleteIndex !== null" class="confirmation-message">
      <div class="confirmation-box">
        <div class="confirmation-text">
          {{ $t("UserGroupManage.deleteConfirmation") }}
        </div>
        <div class="confirmation-buttons">
          <button class="confirm" @click="deleteRow(confirmDeleteIndex)">
            {{ $t("UserGroupManage.confirm") }}
          </button>
          <button class="cancel" @click="cancelDelete">
            {{ $t("UserGroupManage.cancel") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import AddUsergroup from "@/components/AddUsergroup.vue";
import EditUsergroup from "@/components/EditUsergroup.vue";
export default {
  computed: {
    ...mapState(["username"]),
    ...mapState(["usernames"]),
  },
    components: {
    AddUsergroup,
    EditUsergroup,
  },


  watch: {
    tableData2: {
      handler() {
        this.updateNamesData();
        this.updateUsersData();
      },
      deep: true,
    },
  },
  data() {
    return {
      selectedRowIndex: -1,
      isEditDialogVisible: false,
      enteredNames: [],
      editedRow: {
        name: "",
        user: [],
      },
      rowData: {
        name: '',
        user: [],
      },
      tableData2: [],
      isEditing: false,
      isAddDialogVisible: false,
      confirmDeleteIndex: null,
      showWarningMessage: false,
    };
  },

  created() {

    const tableData2FromStorage = JSON.parse(
      sessionStorage.getItem("tableData2")
    );
    if (tableData2FromStorage) {
      this.tableData2 = tableData2FromStorage;
    }
     
  },
  methods: {
    updateNamesData() {
      const names = this.tableData2.map((row) => row.name);
      this.$store.commit("setNamesFromRoute2", names);
    },

    // Set usernames data in the store
    updateUsersData() {
      const username = this.tableData2.map((row) => row.user);
      this.$store.commit("setUsername", username);
    },

    updateUsernames() {
      // Extract usernames from the updated tableData array
      const usernames = this.tableData2.map((row) => row.username);
      this.usernames = Array.from(new Set(usernames)); // Update the computed property
    },


    openEditDialog(index) {
 this.editedRow = { ...this.tableData2[index] };
      this.selectedRowIndex = index;

        this.isEditDialogVisible = true;
      
    },

    closeEditDialog() {
      // Close the edit dialog and reset data
      this.isEditDialogVisible = false;
      this.selectedRowIndex = null;
      this.clearEditFields();
    },
handleEditRow(){
  store.dispatch("setTableData", this.tableData2);
         this.isEditDialogVisible = false; 
},
updateEditedRow(newData){
    this.editedRow = newData;
},
  
    clearEditFields() {
      // Reset the edited row's data
      this.editedRow = {
        name: "",
        user: [],
      };
    },
    confirmDelete(index) {
      this.confirmDeleteIndex = index;
    },

    cancelDelete() {
      this.confirmDeleteIndex = null;
    },

    deleteRow(index) {
      this.tableData2.splice(index, 1);

      this.confirmDeleteIndex = null;

      store.dispatch("setTableData", this.tableData2);
    },
 
   handleAddRow(newRow) {
    
    
        this.tableData2.push(newRow);
        sessionStorage.setItem("tableData2", JSON.stringify(this.tableData2)); // Save in session storage
        this.isAddDialogVisible = false; 
    },
    updateRowData(newData) {
        this.rowData = newData;
    },
   showAddDialog() {
      this.isAddDialogVisible = true;
    },
    closeAddDialog() {
      this.isAddDialogVisible = false;
      this.clearInputFields();
    },



    clearInputFields() {
      this.rowData = {
        name: "",
        user: [],
      };
    },
  },
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
.add-row-button
 {
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

.edit-icon,
.delete-icon {
  cursor: pointer;
  margin-right: 5px;
  color: #3498db; /* Blue color for edit icon */
  transition: color 0.3s;
}

.edit-icon:hover,
.delete-icon:hover {
  color: #2980b9; /* Darker blue on hover for edit icon */
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

/* Style for multi-select */
.styled-selects {
  width: 100%;
  padding: 10px;
  margin: 20px auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  appearance: none;
  background-position: right 10px center;
}

/* Style for multi-select when focused */
.styled-selects:focus {
  outline: none;
  border-color: #51a0e3;
}

/* Style for multi-select options container */
.styled-selecst select {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: transparent;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

/* Style for multi-select options */
.styled-selects select option {
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Style for selected multi-select options */
.styled-selects select option:checked {
  background-color: #51a0e3;
  color: #fff;
}

.warning-message {
  color: #e74c3c;
  margin-top: 10px;
  font-size: 14px;
}

.add-form {
  display: flex;
  flex-direction: column;
  padding: 40px;
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
