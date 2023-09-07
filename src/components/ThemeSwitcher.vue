<!-- ThemeSwitcher.vue -->
<template>
 <div class="theme-selector-container">
    <label for="theme-selector">{{ $t('themeSwitcher.selectTheme') }}</label>
    <select id="theme-selector" v-model="selectedTheme" @change="handleThemeChange(selectedTheme)">
      <option value="theme-purple" class="theme-option">
        <div class="theme-preview" style="background-color: purple;"></div>
        {{ $t('themeSwitcher.defaultTheme') }}
      </option>
      <option value="theme-blue" class="theme-option">
        <div class="theme-preview" style="background-color: blue;"></div>
        {{ $t('themeSwitcher.blueTheme') }}
      </option>
      <option value="theme-green" class="theme-option">
        <div class="theme-preview" style="background-color: green;"></div>
        {{ $t('themeSwitcher.greenTheme') }}
      </option>
      <option value="theme-red" class="theme-option">
        <div class="theme-preview" style="background-color: red;"></div>
        {{ $t('themeSwitcher.redTheme') }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
    props: {
    initialTheme: String, // Pass the initial theme as a prop
  },
  data() {
    return {
     selectedTheme: this.initialTheme, 
    };
  },
methods: {
    handleThemeChange(theme) {
      // Emit the selected theme to the parent component
     // Emit the selected theme to the parent component
      this.$emit('theme-changed', theme);
    

    },
  },
};
</script>

<style>
/* Add this to your CSS */
.theme-selector-container {
  position: absolute;
  top: 10px; /* Adjust as needed for your layout */
  right: 10px; /* Adjust as needed for your layout */
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 999; /* Ensure it's above other content */
  background-color: antiquewhite;
}

#theme-selector {
  border: none;
  background: transparent;
  color: black;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 10px;
  appearance: none; /* Remove default select arrow */
  -webkit-appearance: none; /* Remove default select arrow for Safari */
  -moz-appearance: none; /* Remove default select arrow for Firefox */
}
/* Style the options */
#theme-selector option {
  background-color: rgb(209, 151, 190);
  color: black;
  font-size: 14px;
  padding: 5px;
}
#theme-selector option :hover {
  background-color: #eea1eb ; 
}


/* Style the selected option */
#theme-selector option:checked {
  background-color: #eea1eb ; 
  color: black;
}


</style>