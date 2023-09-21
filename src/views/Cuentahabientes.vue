<template>
  <div class="cuentahabientes">
    <img alt="CuentahabientesIMG" src="../assets/Cuentahabientes.jpg" width="500" />
    <RouterCuentahabientes />
    <v-app>
      <TablaCuentahabientes />
    </v-app>
  </div>
</template>

<script>
// @ es un alias a /src
import TablaCuentahabientes from "@/components/TablaCuentahabientes.vue";
import RouterCuentahabientes from "@/components/RouterCuentahabientes.vue";

export default {
  name: "Cuentahabientes",
  components: {
    TablaCuentahabientes,
    RouterCuentahabientes,
  },
};
</script>