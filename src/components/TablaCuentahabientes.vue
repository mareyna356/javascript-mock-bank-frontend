<template>
  <div class="tabla-cuentahabientes">
    <v-data-table
      :headers="headers"
      :items="datos"
      dark
      style="margin-left: auto; margin-right: auto"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cuentahabientes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo cuentahabiente</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Agregar cuentahabiente</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="objeto.id"
                        type="number"
                        label="claveCuentahabiente"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="objeto.nombre"
                        type="string"
                        label="nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="objeto.edad"
                        type="number"
                        label="edad"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cierra">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="nuevoCuentahabiente">
                  Agregar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogBorrar" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >¿Seguro que desea borrar este cuentahabiente?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cierraBorrar"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="borraCuentahabiente"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogModificar" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Modificar cuentahabiente</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="nombreEnable"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="objeto.nombre"
                        type="string"
                        label="nombre"
                        :disabled="!nombreEnable"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="edadEnable"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="objeto.edad"
                        type="number"
                        label="edad"
                        :disabled="!edadEnable"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cierraModificar">
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="modificaCuentahabiente"
                >
                  Modificar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.acciones`]="{ item }">
        <v-icon small class="mr-2" @click="editaItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="borraItem(item)"> mdi-delete </v-icon>
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
  name: "TablaCuentahabientes",
  data: () => ({
    headers: [
      {
        text: "claveCuentahabiente",
        align: "center",
        value: "claveCuentahabiente",
      },
      {
        text: "nombre",
        align: "center",
        value: "nombre",
      },
      {
        text: "edad",
        align: "center",
        value: "edad",
      },
      {
        text: "cuentas",
        align: "center",
        sortable: false,
        value: "cuentas",
      },
      {
        text: "Acciones",
        value: "acciones",
        sortable: false,
      },
    ],
    datos: [],
    dialog: false,
    dialogModificar: false,
    dialogBorrar: false,
    objeto: {
      id: 0,
      nombre: "",
      edad: 0,
    },
    objetoDefault: {
      id: 0,
      nombre: "",
      edad: 0,
    },
    exito: false,
    error: false,
    msg: "",
    nombreEnable: false,
    edadEnable: false,
  }),
  watch: {
    dialog(val) {
      val || this.cierra();
    },
    dialogModificar(val) {
      val || this.cierraModificar();
    },
    dialogBorrar(val) {
      val || this.cierraBorrar();
    },
  },
  methods: {
    getCuentahabientes() {
      let axios = require("axios");
      axios
        .get("https://localhost:4001/cuentahabientes", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.datos = res.data;
          this.datos.forEach((ch) => {
            let cuentas = [];
            ch.cuentas.forEach((c) => {
              cuentas.push(`claveCuenta: ${c.claveCuenta}, saldo: $${c.saldo}`);
            });
            ch.cuentas = cuentas.join(" | ");
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
    nuevoCuentahabiente() {
      let axios = require("axios");
      axios
        .post("https://localhost:4001/cuentahabientes", this.objeto, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.exito = true;
          this.error = false;
          this.msg = res.data.nombre + " fue agregado exitosamente";
          this.getCuentahabientes();
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
          this.cierra();
        });
    },
    modificaCuentahabiente() {
      if (typeof this.objeto.id != "number") {
        this.error = true;
        this.exito = false;
        this.msg =
          "La clave del cuentahabiente debe ser un número entero mayor a 0";
        this.cierraModificar();
      } else {
        let axios = require("axios");
        let modificacion = {};
        if (this.nombreEnable) modificacion.nombre = this.objeto.nombre;
        if (this.edadEnable) modificacion.edad = this.objeto.edad;
        axios
          .patch(
            "https://localhost:4001/cuentahabientes/" + this.objeto.id,
            modificacion,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            this.exito = true;
            this.error = false;
            this.msg = res.data.nombre + " fue modificado exitosamente";
            this.getCuentahabientes();
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
            this.cierraModificar();
          });
      }
    },
    cierra() {
      this.dialog = false;
      this.$nextTick(() => {
        this.objeto = Object.assign({}, this.objetoDefault);
      });
    },
    cierraModificar() {
      this.dialogModificar = false;
      this.nombreEnable = false;
      this.edadEnable = false;
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
    borraCuentahabiente() {
      if (typeof this.objeto.id != "number") {
        this.error = true;
        this.exito = false;
        this.msg = "claveCuentahabiente debe ser un número entero mayor a 0";
        this.cierraBorrar();
      } else {
        let axios = require("axios");
        axios
          .delete("https://localhost:4001/cuentahabientes/" + this.objeto.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.exito = true;
            this.error = false;
            this.msg = res.data.nombre + " fue eliminado exitosamente";
            this.getCuentahabientes();
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
    editaItem(ch) {
      this.objeto.id = ch.claveCuentahabiente;
      this.objeto.nombre = ch.nombre;
      this.objeto.edad = ch.edad;
      this.dialogModificar = true;
    },
    borraItem(ch) {
      this.objeto.id = ch.claveCuentahabiente;
      this.dialogBorrar = true;
    },
  },
  mounted() {
    this.getCuentahabientes();
  },
};
</script>
