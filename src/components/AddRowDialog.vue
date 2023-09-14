<template>
  <div v-if="isVisible" class="dialog-overlay">
    <div class="add-dialog">
      <h2 class="add-dialog-title">{{ title }}</h2>
      <form @submit.prevent="addRow" class="add-form">
        <label for="username">{{ usernameLabel }}:</label>
        <!-- Use v-model to bind to local data -->
        <input
          id="username"
          v-model="localRowData.username"
          :disabled="editing"
          required
          :maxlength="48"
          :minlength="5"
          class="styled-input"
        />
        <label for="firstname">{{ firstNameLabel }}:</label>
        <input
          id="firstname"
          v-model="localRowData.firstname"
          :maxlength="48"
          class="styled-input"
        />
        <label for="lastname">{{ lastNameLabel }}:</label>
        <input
          id="lastname"
          v-model="localRowData.lastname"
          :maxlength="48"
          class="styled-input"
        />
        <label for="type">{{ typeLabel }}:</label>
        <select id="type" v-model="localRowData.type" required class="styled-select">
          <option value="admin">{{ adminLabel }}</option>
          <option value="user">{{ userLabel }}</option>
        </select>
        <label for="usergroup">{{ userGroupLabel }}:</label>
        <input
          id="usergroup"
          v-model="localRowData.usergroup"
          class="styled-input"
        />
        <div v-if="showWarningMessage" class="warning-message">
          {{ usernameExistsMessage }}
        </div>
        <div class="dialog-buttons">
          <button type="submit" class="dialog-button add-button" >{{ addButtonLabel }}</button>
          <button @click="closeAddDialog" class="dialog-button cancel-button">{{ cancelButtonLabel }}</button>
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
    usernameLabel: String,
    firstNameLabel: String,
    lastNameLabel: String,
    typeLabel: String,
    userGroupLabel: String,
    adminLabel: String,
    userLabel: String,
    usernameExistsMessage: String,
    addButtonLabel: String,
    cancelButtonLabel: String,
    editing: Boolean,
    showWarningMessage: Boolean,
    rowData: Object, // Add rowData as a prop
  },
  data() {
    return {
      // Use local data to store a copy of the prop
      localRowData: { ...this.rowData },
    };
  },
  methods: {
    addRow() {
      if (!this.validateForm()) {
        return;
      }

  
    const newUsername = this.localRowData.username;
      if (this.uniqueUsernames.has(newUsername)) {
        this.$emit('update:show-warning-message', true);
        return;
      }

     const newRow = {
        username: this.localRowData.username,
        firstname: this.localRowData.firstname || '',
        lastname: this.localRowData.lastname || '',
        type: this.localRowData.type,
        usergroup: this.localRowData.usergroup || '',
        creater: this.username,
        creationTime: new Date(),
        lastModifier: this.username,
        lastModificationTime: new Date(),
      };
      this.uniqueUsernames.add(newUsername);
      this.$emit('update:showWarningMessage', false);
     this.$emit('add-row', newRow); // Emit the "add-row" event
      this.closeAddDialog();
    },

    validateForm() {
      let isValid = true;

      if (!this.localRowData.username || this.localRowData.username.length < 5 || this.localRowData.username.length > 48) {
        isValid = false;
      }

      if (!this.localRowData.type) {
        isValid = false;
      }

      return isValid;
    },
    closeAddDialog() {
      this.$emit('close-add-dialog');
    },
  },
};
</script>
