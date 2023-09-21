<template>
  <div class="home">
    <img alt="HomeIMG" src="../assets/Home.jpg" width="250" />
    <Menu />
  </div>
</template>

<script>
// @ es un alias a /src
import Menu from "@/components/Menu.vue";

export default {
  name: "Home",
  components: {
    Menu,
  },
};
</script>