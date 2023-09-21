<template>
  <div class="tabla-cuentas">
    <v-data-table
      :headers="headers"
      :items="datos"
      dark
      style="margin-left: auto; margin-right: auto"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cuentas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogAgregar">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark class="mb-2" v-bind="attrs" v-on="on"
                >Nueva cuenta</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Agrega cuenta</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="objeto.id"
                        type="number"
                        label="claveCuenta"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="objeto.saldo"
                        type="number"
                        label="saldo"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="objeto.cuentahabientes"
                        type="text"
                        label="cuentahabientes: id1, id2, ..."
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cerrar"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="nuevaCuenta"
                  >Agregar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogBorrar" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >¿Seguro que desea borrar esta cuenta?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cierraBorrar"
                  >Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="borraCuenta"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.acciones`]="{ item }">
        <v-icon small @click="opcionBorra(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <br />
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
    <br />
  </div>
</template>

<script>
export default {
  name: "TablaCuentas",
  data: () => ({
    headers: [
      {
        text: "claveCuenta",
        align: "center",
        value: "claveCuenta",
      },
      {
        text: "saldo",
        align: "center",
        value: "saldo",
      },
      {
        text: "cuentahabientes",
        align: "center",
        sortable: false,
        value: "cuentahabientes",
      },
      {
        text: "Acciones",
        value: "acciones",
        sortable: false,
      },
    ],
    datos: [],
    dialogAgregar: false,
    dialogBorrar: false,
    objeto: {
      id: 0,
      saldo: 0,
      cuentahabientes: "",
    },
    objetoDefault: {
      id: 0,
      saldo: 0,
      cuentahabientes: "",
    },
    exito: false,
    error: false,
    msg: "",
  }),
  watch: {
    dialogAgregar(val) {
      val || this.cerrar();
    },
    dialogBorrar(val) {
      val || this.cierraBorrar();
    },
  },
  methods: {
    getCuentas() {
      let axios = require("axios");
      axios
        .get("https://localhost:4001/cuentas", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.datos = res.data;
          this.datos.forEach((c) => {
            let cuentahabientes = [];
            c.cuentahabientes.forEach((ch) => {
              cuentahabientes.push(
                `claveCuentahabiente: ${ch.claveCuentahabiente}, ${ch.nombre}, ${ch.edad} años`
              );
            });
            c.cuentahabientes = cuentahabientes.join(" | ");
            c.saldo = "$" + c.saldo;
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push({name: "Login"});
          } else {
            this.error = true;
            this.exito = false;
            this.msg = err.response.data.msg;
          }
        });
    },
    nuevaCuenta() {
      let axios = require("axios");
      this.objeto.cuentahabientes = this.objeto.cuentahabientes
        .split(",")
        .map(Number);
      axios
        .post("https://localhost:4001/cuentas", this.objeto, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.exito = true;
          this.error = false;
          this.msg =
            "La cuenta de clave " +
            res.data.claveCuenta +
            " fue agregada exitosamente";
          this.getCuentas();
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push({name: "Login"});
          } else {
            this.error = true;
            this.exito = false;
            this.msg = err.response.data.msg;
          }
        })
        .finally(() => {
          this.cerrar();
        });
    },
    cerrar() {
      this.dialogAgregar = false;
      this.$nextTick(() => {
        this.objeto = Object.assign({}, this.objetoDefault);
      });
    },
    cierraBorrar() {
      this.dialogBorrar = false;
      this.$nextTick(() => {
        this.objeto = Object.assign({}, this.objetoDefault);
      });
    },
    borraCuenta() {
      if (typeof this.objeto.id != "number") {
        this.error = true;
        this.exito = false;
        this.msg = "claveCuenta debe ser un número entero mayor a 0";
        this.cierraBorrar();
      } else {
        let axios = require("axios");
        axios
          .delete("https://localhost:4001/cuentas/" + this.objeto.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.exito = true;
            this.error = false;
            this.msg =
              "La cuenta de clave " +
              res.data.claveCuenta +
              " fue eliminada exitosamente";
            this.getCuentas();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push({name: "Login"});
            } else {
              this.error = true;
              this.exito = false;
              this.msg = err.response.data.msg;
            }
          })
          .finally(() => {
            this.cierraBorrar();
          });
      }
    },
    opcionBorra(cuenta) {
      this.objeto.id = cuenta.claveCuenta;
      this.dialogBorrar = true;
    },
  },
  mounted() {
    this.getCuentas();
  },
};
</script>
