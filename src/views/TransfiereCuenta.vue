<template>
  <div class="transfiere-cuenta">
    <img alt="CuentasIMG" src="../assets/Cuentas.jpg" width="450" />
    <RouterCuentas />
    <v-row>
      <v-col sm="4">
        <v-text-field
          v-model.number="claveCuentaFuente"
          type="number"
          label="Clave de cuenta fuente"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-text-field
          v-model.number="transferencia"
          type="number"
          label="Transferencia"
          prepend-icon="mdi-currency-usd"
        ></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-text-field
          v-model.number="claveCuentaDestino"
          type="number"
          label="Clave de cuenta destino"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn @click="transferir"> Transferir </v-btn>
    <div>
      <br />
      <v-alert v-model="error" type="error" color="#F44336" dismissible>{{
        msg
      }}</v-alert>
    </div>
    <div>
      <v-alert v-model="exito" type="success" color="#4CAF50" dismissible>{{
        msg
      }}</v-alert>
    </div>
    <v-app>
      <TablaCuentas :key="actualiza" />
    </v-app>
  </div>
</template>

<script>
// @ es un alias a /src
import TablaCuentas from "@/components/TablaCuentas.vue";
import RouterCuentas from "@/components/RouterCuentas.vue";

export default {
  name: "TransfiereCuenta",
  components: {
    TablaCuentas,
    RouterCuentas,
  },
  data: () => ({
    claveCuentaFuente: 0,
    claveCuentaDestino: 0,
    transferencia: 0,
    exito: false,
    error: false,
    msg: "",
    actualiza: true,
  }),
  methods: {
    transferir() {
      if (typeof this.claveCuentaFuente != "number") {
        this.error = true;
        this.exito = false;
        this.msg =
          "La clave de la cuenta fuente debe ser un número entero mayor a 0";
      } else if (typeof this.claveCuentaDestino != "number") {
        this.error = true;
        this.exito = false;
        this.msg =
          "La clave de la cuenta destino debe ser un número entero mayor a 0";
      } else {
        let axios = require("axios");
        let modificacion = {};
        modificacion.transferencia = this.transferencia;
        axios
          .patch(
            "https://localhost:4001/cuentas/" +
              this.claveCuentaFuente +
              "/transferencia/" +
              this.claveCuentaDestino,
            modificacion,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            this.actualiza = !this.actualiza;
            this.exito = true;
            this.error = false;
            this.msg = "Transferencia exitosa";
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push("../login");
            } else {
              this.error = true;
              this.exito = false;
              this.msg = err.response.data.msg;
            }
          });
      }
    },
  },
};
</script>