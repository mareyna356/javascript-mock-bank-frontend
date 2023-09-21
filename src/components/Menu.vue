<template>
  <div class="menu">
    <v-textarea :value="stringMenu" auto-grow readonly filled> </v-textarea>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    stringMenu: String,
  }),
  mounted() {
    let axios = require("axios");
    axios.get("https://localhost:4001").then((res) => {
      this.stringMenu = res.data;
    });
  },
};
</script>