<template>
  <div class="file-management">
     <h1>User Management for {{ username }}</h1>
    <h2>File Management</h2>
    <div class="current-path">Current Path: {{ currentPath }}</div>
    <div class="actions">
      <div class="create-folder">
        <input v-model="newFolderName" placeholder="Enter folder name" />
        <button @click="createFolder">Create Folder</button>
      </div>
      
      <div class="upload-file">
        <input type="file" ref="fileInput" @change="uploadFiles" multiple />
      </div>
      <div class="file-actions">
        <button class="action-button copy-button" @click="copySelectedFiles">Copy</button>
        <button class="action-button move-button" @click="moveSelectedFiles">Move</button>
        <button class="action-button delete-button" @click="deleteSelectedFiles">Delete</button>
        <button class="action-button download-button" @click="downloadSelectedFiles">Download</button>
       <button id="shareButton" @click="openShareDialog">Share</button>

      </div>
    </div>
   <!-- Add this code below the "Share" button -->
<div class="share-dialog-overlay" v-if="showShareDialog">
  <div class="share-dialog">
    <h3>Share Files</h3>
    <!-- Add sharing options and input fields here -->
    <button @click="closeShareDialog">Close</button>
  </div>
</div>

<div class="folders">
  <div v-for="folder in folders" :key="folder">
    <i class="fas fa-folder" @click="openFolder(folder)"></i>
    <span @click="openFolder(folder)">{{ getFolderName(folder) }}</span>
    <i class="fas fa-trash-alt delete-folder" @click="deleteFolder(folder)"></i>
  </div>
</div>
    <div class="uploaded-files">
      <h3>Uploaded Files:</h3>
      <ul>
        <li v-for="(file, index) in uploadedFiles" :key="index" :class="{ selected: file.selected }">
          <input type="checkbox" v-model="file.selected" class="file-checkbox" />
          <strong>File Name:</strong> {{ file.name }}<br />
          <strong>File Size:</strong> {{ file.size }} bytes<br />
          <strong>Directory:</strong> {{ file.directory }}
        </li>
      </ul>
    </div>
<div class="folder-contents">
  <h3>Folder Contents:</h3>
  <ul>
    <li v-for="(item, index) in currentFolderContents" :key="index">
      <strong v-if="item.type === 'folder'">Folder:</strong>
      <strong v-if="item.type === 'file'">File:</strong>
      {{ item.name }}
    </li>
  </ul>
</div>
  </div>
</template>


<script>

export default {
    name: 'FileManagement',
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
  data() {
    return {
      currentPath: '/',
      newFolderName: '',
      folders: [],
      uploadedFiles: [],
        currentFolderContents: [],
         showShareDialog: false,
    };
  },

  created() {
   const storedFolders = sessionStorage.getItem(`folders_${this.username}`);
    if (storedFolders) {
      this.folders = JSON.parse(storedFolders);
    }

    const storedUploadedFiles = sessionStorage.getItem(`uploadedFiles_${this.username}`);
    if (storedUploadedFiles) {
      this.uploadedFiles = JSON.parse(storedUploadedFiles);
    }
       this.updateCurrentFolderContents();
  },
   watch: {
    // Watch for changes in the 'folders' and 'uploadedFiles' arrays
    folders: {
      handler: function () {
        // Do nothing, just watch for changes to trigger re-render
      },
      deep: true,
    },
    uploadedFiles: {
      handler: function () {
        // Do nothing, just watch for changes to trigger re-render
      },
      deep: true,
    },
  },
  methods: {
     forceRerender() {
      this.$forceUpdate();
    },
      openShareDialog() {
      // Show the ShareDialog component when the "Share" button is clicked
      this.showShareDialog = true;
    },

    closeShareDialog() {
      // Hide the ShareDialog component when the dialog is closed
      this.showShareDialog = false;
    },
    createFolder() {
      const newFolder = `${this.currentPath}${this.newFolderName}/`;

      // Check if the folder already exists
      if (this.folders.includes(newFolder)) {
        alert('Folder already exists.');
        return;
      }

      // Add the folder to the list of folders
      this.folders.push(newFolder);
      this.newFolderName = ''; // Clear the input field

  sessionStorage.setItem(`folders_${this.username}`, JSON.stringify(this.folders));
    },
        openFolder(folder) {
      this.currentPath = folder;
      this.updateCurrentFolderContents();
    },

   updateCurrentFolderContents() {
      this.currentFolderContents = this.uploadedFiles.filter((item) => {
        return item.directory === this.currentPath && item.username === this.username;
      });
    },
    getFolderName(folder) {
      return folder.split('/').filter(Boolean).pop(); // Get the last part of the path as folder name
    },
    deleteFolder(folder) {
      const index = this.folders.indexOf(folder);
      if (index !== -1) {
        this.folders.splice(index, 1);

       sessionStorage.setItem(`folders_${this.username}`, JSON.stringify(this.folders));
      }
    },
    uploadFiles() {
      const fileInput = this.$refs.fileInput;
      const files = fileInput.files;
     
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const currentTime = new Date().toLocaleString();
        const fileDetails = {
          name: file.name,
          size: file.size,
          directory: this.currentPath,
            owner: this.username, // Assuming username is the owner
         uploadTime: currentTime,
        };
        this.uploadedFiles.push(fileDetails);
      this.$emit('newFileAdded', fileDetails);

      }

      // Clear the file input field
      fileInput.value = '';

      // Save the updated uploaded files in sessionStorage
      sessionStorage.setItem(`uploadedFiles_${this.username}`, JSON.stringify(this.uploadedFiles));
    },
     toggleFileSelection(file) {
      file.selected = !file.selected;
    },
        downloadSelectedFiles() {
      const selectedFiles = this.uploadedFiles.filter((file) => file.selected);

      if (!selectedFiles.length) {
        alert('No files selected.');
        return;
      }

      const fileNames = selectedFiles.map((file) => file.name).join('\n');
      const blob = new Blob([fileNames], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'selected_files.txt';
      a.click();

      // Clear the selected files
      selectedFiles.forEach((file) => {
        file.selected = false;
      });
    }, 
    copySelectedFiles() {
      // Implement copy logic here
      this.uploadedFiles.forEach((file) => {
        if (file.selected) {
          // Create a copy of the file
          const copyOfFile = { ...file };
          copyOfFile.directory = this.currentPath;
          this.uploadedFiles.push(copyOfFile);
        }
      });
      
     sessionStorage.setItem(`uploadedFiles_${this.username}`, JSON.stringify(this.uploadedFiles));

      // Clear the selected files
      this.uploadedFiles = this.uploadedFiles.filter((file) => !file.selected);
    },

  moveSelectedFiles() {
      const selectedFiles = this.uploadedFiles.filter((file) => file.selected);

      if (!selectedFiles.length) {
        alert('No files selected.');
        return;
      }

      // Move selected files to the current path
      selectedFiles.forEach((file) => {
        file.directory = this.currentPath;
      });
     sessionStorage.setItem(`uploadedFiles_${this.username}`, JSON.stringify(this.uploadedFiles));

      // Clear the selected files
      selectedFiles.forEach((file) => {
        file.selected = false;
      });

      // Update the current folder contents
      this.updateCurrentFolderContents();
    },
    
      deleteSelectedFiles() {
      this.uploadedFiles = this.uploadedFiles.filter((file) => !file.selected);
     sessionStorage.setItem(`uploadedFiles_${this.username}`, JSON.stringify(this.uploadedFiles));
    },
    deleteFile(file) {
      const index = this.uploadedFiles.indexOf(file);
      if (index !== -1) {
        this.uploadedFiles.splice(index, 1);

  sessionStorage.setItem(`uploadedFiles_${this.username}`, JSON.stringify(this.uploadedFiles));
      }
    },
  },
};
</script>


<style scoped>


.file-management {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.current-path {
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-folder input,
.upload-file input {
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.file-actions {
  display: flex;
  gap: 10px;
}

.folders {
  margin-top: 10px;
  font-weight: bold;
}

.folders i {
  margin-right: 5px;
  color: #007bff;
  cursor: pointer;
}

.uploaded-files ul {
  list-style: none;
  padding: 0;
}

.uploaded-files li {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative;
  transition: background-color 0.3s;
}

.uploaded-files li:hover {
  background-color: #eaeaea;
}

.file-checkbox {
  margin-right: 5px;
}

.selected {
  background-color: #d8eaf1;
}

.delete-file,
.delete-folder {
  color: red;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.2rem;
}
.action-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.action-button:hover {
  background-color: #0056b3;
}

/* Styles for individual action buttons */
.copy-button {
  background-color: #28a745; /* Green color for copy */
}

.move-button {
  background-color: #ffc107; /* Yellow color for move */
}

.delete-button {
  background-color: #dc3545; /* Red color for delete */
}

.download-button {
  background-color: #17a2b8; /* Teal color for download */
}


</style>
