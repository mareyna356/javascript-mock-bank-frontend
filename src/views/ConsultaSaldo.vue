<template>
  <div class="consulta-saldo">
    <img alt="CuentasIMG" src="../assets/Cuentas.jpg" width="450" />
    <RouterCuentas />
    <div data-app>
      <v-row>
        <v-col sm="6">
          <v-select
            :items="items"
            v-model="claveCuenta"
            label="Clave de cuenta"
            @change="muestraSaldo"
          ></v-select>
        </v-col>
        <v-col sm="6">
          <v-text-field
            v-model="saldo"
            label="Saldo"
            readonly
            prepend-icon="mdi-currency-usd"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div>
      <br />
      <v-alert v-model="error" type="error" color="#F44336" dismissible>{{
        msg
      }}</v-alert>
    </div>
  </div>
</template>

<script>
// @ es un alias a /src
import RouterCuentas from "@/components/RouterCuentas.vue";

export default {
  name: "ConsultaSaldo",
  components: {
    RouterCuentas,
  },
  data: () => ({
    items: [],
    claveCuenta: 0,
    saldo: 0,
    error: false,
    msg: "",
  }),
  methods: {
    muestraSaldo() {
      let axios = require("axios");
      axios
        .get("https://localhost:4001/cuentas/" + this.claveCuenta + "/saldo", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.saldo = res.data;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("../login");
          } else {
            this.error = true;
            this.msg = err.response.data.msg;
          }
        });
    },
  },
  mounted() {
    let axios = require("axios");
    axios
      .get("https://localhost:4001/cuentas", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        res.data.forEach((c) => {
          this.items.push(c.claveCuenta);
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.$router.push("../login");
        } else {
          this.error = true;
          this.msg = err.response.data.msg;
        }
      });
  },
};
</script>