<template>
  <div id="login">
    <v-row>
      <v-col sm="6">
        <v-text-field
          v-model="user.username"
          type="string"
          label="Username"
        ></v-text-field>
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model="user.password"
          type="string"
          label="Password"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn @click="login">Login</v-btn><br /><br />
    <v-btn @click="logout">Logout</v-btn>
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
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    error: false,
    exito: false,
    msg: "",
    user: {
      username: "",
      password: "",
    },
  }),
  methods: {
    login() {
      if (localStorage.getItem("token") === null) {
        let axios = require("axios");
        axios
          .post("https://localhost:4001/login", this.user)
          .then((res) => {
            this.error = false;
            this.exito = true;
            this.msg = "Login exitoso";
            localStorage.setItem("token", res.data.token);
          })
          .catch((err) => {
            this.error = true;
            this.exito = false;
            this.msg = err.response?.data.msg;
          });
      } else {
        this.error = true;
        this.exito = false;
        this.msg = "Ya tiene una sesión iniciada";
      }
    },
    logout() {
      if (localStorage.getItem("token") === null) {
        this.error = true;
        this.exito = false;
        this.msg = "No tiene una sesión iniciada";
      } else {
        localStorage.clear();
        this.error = false;
        this.exito = true;
        this.msg = "Logout exitoso";
      }
    },
  },
};
</script>
