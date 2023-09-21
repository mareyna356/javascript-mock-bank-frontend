<template>
  <div id="app">
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      Banco
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-layout mt-4 column align-center>
        <v-flex>
          <v-avatar>
            <img src="./assets/User.png" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <div id="nav">
        <router-link to="/login">Login</router-link>
      </div>
      <v-list dense nav id="nav">
        <v-list-item><router-link to="/">Home</router-link></v-list-item
        ><v-divider></v-divider>
        <v-list-item
          ><router-link to="/cuentahabientes"
            >Cuentahabientes</router-link
          ></v-list-item
        ><v-divider></v-divider>
        <v-list-item
          ><router-link to="/cuentas">Cuentas</router-link></v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
  }),
};
</script>

<style>
#app {
  padding: 100px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Views no elegidos */
#nav a {
  font-weight: bold;
  color: #42b983;
}

/* View elegido */
#nav a.router-link-exact-active {
  color: #2c3e50;
}
</style>