<template>
  
    <!-- Edit Row Dialog -->
    <div v-if="isEditDialogVisible" class="dialog-overlay">
      <div class="add-dialog">
        <h2 class="add-dialog-title">{{ $t("UserGroupManage.editRowTitle") }}</h2>
        <form @submit.prevent="editRow" class="add-form">
          <!-- Name (Unchangeable) -->
          <label for="edit-name">{{ $t("UserGroupManage.name") }}:</label>
          <input
            id="edit-name"
            v-model="editedName"
            :disabled="true"
            class="styled-input"
          />
          <!-- User (Changeable) -->

          <label for="edit-user">{{ $t("UserGroupManage.user") }}:</label>
          <select
            id="edit-user"
            v-model="editedUser"
            multiple
            class="styled-selects"
          >
            <option
              v-for="(username, index) in usernames"
              :value="username"
              :key="index"
            >
              {{ username }}
            </option>
          </select>
          <div class="dialog-buttons">
            <button type="submit" class="dialog-button add-button">
              {{ $t("UserGroupManage.updatebutton") }}
            </button>
            <button
              @click="closeEditDialog"
              class="dialog-button cancel-button"
            >
              {{ $t("UserGroupManage.cancelButton") }}
            </button>
          </div>
        </form>
      </div>
    </div>
</template>


<script>
export default {
  props: {
    isEditDialogVisible: Boolean,
  editedRow: Object,
    usernames: Array,
  },
    data() {
    return {
      editedName: '',
      editedUser: [],
      localRow: {} ,
       tableData2: [],
    };
  },
  mounted() {
    // When the component is mounted, set the initial values
    this.editedName = this.editedRow.name;
    this.editedUser = [...this.editedRow.user]; // Assuming it's an array
    // For deep objects, you might need to create a local copy like this
    this.localRow = Object.assign({}, this.editedRow);
  },
  watch: {
    // Watch for changes in local data and update the prop when changes occur
    localName(newVal) {
      this.$emit('update:editedRow', { ...this.editedRow, name: newVal });
    },
    localUser(newVal) {
      this.$emit('update:editedRow', { ...this.editedRow, user: newVal });
    }
  },
  methods: {
    closeEditDialog() {
      this.$emit('close-edit-dialog');
      this.clearEditFields();
    },

    editRow() {
      if (this.selectedRowIndex !== -1) {
        const currentTime = new Date();

        // Update the selected row's data
        const selectedRow = this.tableData2[this.selectedRowIndex];
        selectedRow.user = [...this.editedRow.user]; // Update the 'user' field
        selectedRow.lastModifier = this.username;
        selectedRow.lastModificationTime = currentTime;

         this.$emit('edit-row', selectedRow); 

        

        // Close the edit dialog and reset data
        this.closeEditDialog();
      }
    },


    clearEditFields() {
      this.$emit('close-add-dialog');
      this.$emit('clear-input-fields');
    },
    
  }
};





</script>