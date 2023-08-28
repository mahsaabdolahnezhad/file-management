<template>
<div class="page-container">
<div class="frame">
  <div class="table-container">
    <form @submit.prevent="addRow">
      <!-- Your input fields here -->
      <button type="submit">Add Row</button>
    </form>
    <div class="scrollable-table">
    <table class="styled-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Type</th>
          <th>User Group</th>
          <th>Creater</th>
          <th>Creation Time</th>
          <th>Last Modifier</th>
          <th>Last Modification Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td>{{ row.username }}</td>
          <td>{{ row.firstname }}</td>
          <td>{{ row.lastname }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.usergroup }}</td>
          <td>{{ row.creater }}</td>
          <td>{{ row.creationTime }}</td>
          <td>{{ row.lastModifier }}</td>
          <td>{{ row.lastModificationTime }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
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
      tableData: [], // Store the added rows here
      isEditing: false
    };
  },
  methods: {
    addRow() {
      const newRow = {
        username: this.rowData.username,
        firstname: this.rowData.firstname,
        lastname: this.rowData.lastname,
        type: this.rowData.type,
        usergroup: this.rowData.usergroup,
        creater: this.rowData.username,
        creationTime: new Date(),
        lastModifier: this.rowData.username,
        lastModificationTime: new Date()
      };

      this.tableData.push(newRow); // Add the new row to the tableData array

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
  font-size:15px;
}

.frame {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.table-container {
  width: 100%;
  height: 500px; 
  overflow: auto;
}

.scrollable-table {
  width: max-content;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: aut0;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.styled-table th, .styled-table td {
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
</style>





