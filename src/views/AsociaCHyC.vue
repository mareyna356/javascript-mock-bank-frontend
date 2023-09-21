<template>
  <div class="asocia-ch-y-c">
    <img alt="CuentahabientesIMG" src="../assets/Cuentahabientes.jpg" width="500" />
    <RouterCuentahabientes />
    <v-row>
      <v-col sm="6">
        <v-text-field
          v-model.number="claveCuentahabiente"
          type="number"
          label="Clave de cuentahabiente"
        ></v-text-field>
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model.number="claveCuenta"
          type="number"
          label="Clave de cuenta a asociar"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn @click="asociar"> Asociar </v-btn>
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
      <TablaCuentahabientes :key="actualizaCH" />
    </v-app>
  </div>
</template>

<script>
// @ es un alias a /src
import TablaCuentahabientes from "@/components/TablaCuentahabientes.vue";
import RouterCuentahabientes from "@/components/RouterCuentahabientes.vue";

export default {
  name: "AsociaCHyC",
  components: {
    TablaCuentahabientes,
    RouterCuentahabientes,
  },
  data: () => ({
    claveCuentahabiente: 0,
    claveCuenta: 0,
    exito: false,
    error: false,
    msg: "",
    actualizaCH: true,
    actualizaC: true,
  }),
  methods: {
    asociar() {
      if (typeof this.claveCuentahabiente != "number") {
        this.error = true;
        this.exito = false;
        this.msg =
          "La clave del cuentahabiente debe ser un número entero mayor a 0";
      } else {
        let axios = require("axios");
        let asociacion = {};
        asociacion.idCuenta = this.claveCuenta;
        axios
          .patch(
            "https://localhost:4001/cuentahabientes/" +
              this.claveCuentahabiente +
              "/asocia",
            asociacion,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            this.actualizaC = !this.actualizaC;
            this.actualizaCH = !this.actualizaCH;
            this.exito = true;
            this.error = false;
            this.msg =
              "Se asoció el cuentahabiente " +
              res.data[0].nombre +
              " a la cuenta " +
              res.data[1].claveCuenta +
              " exitosamente";
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