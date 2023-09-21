<template>
  <div class="router-cuentas">
    <div id="nav">
      <router-link to="/cuentas/saldo">Consultar saldos</router-link> |
      <router-link to="/cuentas/deposito">Depositar</router-link> |
      <router-link to="/cuentas/retiro">Retirar</router-link> |
      <router-link to="/cuentas/transferencia">Transferir</router-link>
    </div>
    <br />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "RouterCuentas",
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