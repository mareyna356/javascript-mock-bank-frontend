<template>
  <div class="router-cuentahabientes">
    <div id="nav">
      <router-link to="/cuentahabientes/asocia">Asociar cuenta</router-link> |
      <router-link to="/cuentahabientes/desasocia"
        >Desasociar cuenta</router-link
      >
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "RouterCuentahabientes",
};
</script>

<style>
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