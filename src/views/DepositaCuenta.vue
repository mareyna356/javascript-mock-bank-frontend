<template>
  <div class="deposita-cuenta">
    <img alt="CuentasIMG" src="../assets/Cuentas.jpg" width="450" />
    <RouterCuentas />
    <v-row>
      <v-col sm="6">
        <v-text-field
          v-model.number="claveCuenta"
          type="number"
          label="Clave de cuenta en la que se depositará"
        ></v-text-field>
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model.number="deposito"
          type="number"
          label="Depósito"
          prepend-icon="mdi-currency-usd"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn @click="depositar"> Depositar </v-btn>
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
  name: "DepositaCuenta",
  components: {
    TablaCuentas,
    RouterCuentas,
  },
  data: () => ({
    claveCuenta: 0,
    deposito: 0,
    exito: false,
    error: false,
    msg: "",
    actualiza: true,
  }),
  methods: {
    depositar() {
      if (typeof this.claveCuenta != "number") {
        this.error = true;
        this.exito = false;
        this.msg = "La clave de la cuenta debe ser un número entero mayor a 0";
      } else {
        let axios = require("axios");
        let modificacion = {};
        modificacion.deposito = this.deposito;
        axios
          .patch(
            "https://localhost:4001/cuentas/" + this.claveCuenta + "/deposito",
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
            this.msg = "Depósito exitoso";
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