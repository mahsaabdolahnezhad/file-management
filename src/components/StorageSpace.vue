<template>
  <div>
    <h1>File Information</h1>
    <table>
      <thead>
        <tr>
          <th>Owner</th>
          <th>File Path</th>
          <th>Size</th>
          <th>Upload Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, index) in files" :key="index">
          <td>{{ file.owner }}</td>
          <td>{{ file.directory }}</td>
          <td>{{ file.size }} bytes</td>
          <td>{{ file.uploadTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['files'],


}

</script>

<style scoped>
/* Add scoped attribute to limit styles to this component only */

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
