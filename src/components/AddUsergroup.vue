
<template>
    <div v-if="isAddDialogVisible" class="dialog-overlay">
      <div class="add-dialog">
        <h2 class="add-dialog-title">{{ $t("UserGroupManage.addRowTitle") }}</h2>
        <form @submit.prevent="addRow" class="add-form">
          <!-- Name -->
          <label for="name">{{ $t("UserGroupManage.name") }}:</label>
          <input
            id="name"
            v-model="localName"
            required
            :maxlength="48"
            :minlength="5"
            class="styled-input"
            :disabled="false"
          />
          <!-- User (Multi-select) -->
          <label for="user">{{ $t("UserGroupManage.user") }}:</label>
          <select
            id="user"
            v-model="localUser"
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
            <button   type="submit" class="dialog-button add-button">
              {{ $t("UserGroupManage.addButton") }}
            </button>
            <button @click="closeAddDialog" class="dialog-button cancel-button">
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
    isAddDialogVisible: Boolean,
    rowData: Object,
    usernames: Array,
  },
    data() {
    return {
      localName: '',
      localUser: [],
      localRowData: {} ,
       tableData2: [],
    };
  },
  mounted() {
    // When the component is mounted, set the initial values
    this.localName = this.rowData.name;
    this.localUser = [...this.rowData.user]; // Assuming it's an array
    // For deep objects, you might need to create a local copy like this
    this.localRowData = Object.assign({}, this.rowData);
  },
  watch: {
    // Watch for changes in local data and update the prop when changes occur
    localName(newVal) {
      this.$emit('update:rowData', { ...this.rowData, name: newVal });
    },
    localUser(newVal) {
      this.$emit('update:rowData', { ...this.rowData, user: newVal });
    }
  },
  methods: {
    closeAddDialog() {
      this.$emit('close-add-dialog');
      this.clearInputFields();
    },

    addRow() {
      if (!this.validateForm()) {
        return;
      }
      const newName = this.rowData.name;

      if (this.tableData2.some((row) => row.name === newName)) {
        this.showWarningMessage = true;
        return;
      }

      const newRow = {
        name: this.rowData.name,
        user: [...this.rowData.user],
        creator: this.username,
        creationTime: new Date(),
        lastModifier: this.username,
        lastModificationTime: new Date(),
      };

      this.$emit('add-row', newRow); // Emit an event to send the new row data to the parent component

      this.closeAddDialog();
    },

    validateForm() {
      let isValid = true;

      if (
        !this.rowData.name ||
        this.rowData.name.length < 5 ||
        this.rowData.name.length > 48
      ) {
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
