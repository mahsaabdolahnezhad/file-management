<template>
  <div v-if="isVisible" class="dialog-overlay">
    <div class="add-dialog">
      <h2 class="add-dialog-title">{{ title }}</h2>
      <form @submit.prevent="editRow" class="add-form">
        <!-- Input fields for editing -->
        <label for="edit-firstname">{{ $t('RouteIndex1.firstName') }}:</label>
        <input
          id="edit-firstname"
          v-model="editedData.firstname"
          :maxlength="48"
          class="styled-input"
        />
        <label for="edit-lastname">{{ $t('RouteIndex1.lastName') }}:</label>
        <input
          id="edit-firstname"
          v-model="editedData.lastname"
          :maxlength="48"
          class="styled-input"
        />
        <label for="edit-type">{{ $t('RouteIndex1.type') }}:</label>
        <select
          id="edit-type"
          v-model="editedData.type"
          required
          class="styled-select"
        >
          <option value="admin">{{ $t('RouteIndex1.admin') }}</option>
          <option value="user">{{ $t('RouteIndex1.user') }}</option>
        </select>
        <label for="edit-usergroup">{{ $t('RouteIndex1.userGroup') }}:</label>
        <input
          id="edit-usergroup"
          v-model="editedData.usergroup"
          class="styled-input"
        />
        <div class="dialog-buttons">
          <button
            type="submit"
            class="dialog-button add-button"
          >
            {{ $t('RouteIndex1.updatebutton') }}
          </button>
          <button
            @click="closeEditDialog"
            class="dialog-button cancel-button"
          >
            {{ $t('RouteIndex1.cancelButton') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    isVisible: Boolean,
    title: String,
    editedRow: Object,
   selectedRowIndex: Number, // Add selectedRowIndex prop
  selectedUsername: String, 
  },
   data() {
    return {
      editedData: {
        firstname: '',
        lastname: '',
        type: '',
        usergroup: '',
      },
    };
  },
  watch: {
    editedRow: {
      handler(newValue) {
        // Update the local copy when the prop changes
        this.editedData = { ...newValue };
      },
      immediate: true, // Handle the initial value of the prop
    },
  },
  methods: {
    editRow() {
         if (this.selectedRowIndex !== -1){
    const currentTime = new Date();

    // Update the selected row's data
    const selectedRow = this.tableData[this.selectedRowIndex];
    selectedRow.firstname = this.editedData.firstname;
    selectedRow.lastname = this.editedData.lastname;
    selectedRow.type = this.editedData.type;
    selectedRow.usergroup = this.editedData.usergroup;
    selectedRow.lastModifier = this.selectedUsername; // Use the selectedUsername prop
    selectedRow.lastModificationTime = currentTime;


   sessionStorage.setItem('tableData', JSON.stringify(this.tableData));
    // Close the edit dialog and reset data
  
  this.$emit('update-row', selectedRow);
  this.closeEditDialog();
         }
    },
    closeEditDialog() {
      this.$emit('close-edit-dialog');
    },
  },
};
</script>
