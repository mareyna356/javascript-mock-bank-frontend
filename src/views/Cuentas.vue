<template>
  <div class="cuentas">
    <img alt="CuentasIMG" src="../assets/Cuentas.jpg" width="450" />
    <RouterCuentas />
    <v-app>
      <TablaCuentas />
    </v-app>
  </div>
</template>

<script>
// @ es un alias a /src
import TablaCuentas from "@/components/TablaCuentas.vue";
import RouterCuentas from "@/components/RouterCuentas.vue";

export default {
  name: "Cuentas",
  components: {
    TablaCuentas,
    RouterCuentas,
  },
};
</script>