import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cuentahabientes from "../views/Cuentahabientes.vue";
import AsociaCHyC from "../views/AsociaCHyC.vue";
import DesasociaCHyC from "../views/DesasociaCHyC.vue";
import Cuentas from "../views/Cuentas.vue";
import ConsultaSaldo from "../views/ConsultaSaldo.vue";
import DepositaCuenta from "../views/DepositaCuenta.vue";
import RetiraCuenta from "../views/RetiraCuenta.vue";
import TransfiereCuenta from "../views/TransfiereCuenta.vue"
import Login from "../views/Login.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cuentahabientes",
    name: "Cuentahabientes",
    component: Cuentahabientes,
  },
  {
    path: "/cuentahabientes/asocia",
    name: "AsociaCHyC",
    component: AsociaCHyC,
  },
  {
    path: "/cuentahabientes/desasocia",
    name: "DesasociaCHyC",
    component: DesasociaCHyC,
  },
  {
    path: "/cuentas",
    name: "Cuentas",
    component: Cuentas,
  },
  {
    path: "/cuentas/saldo",
    name: "ConsultaSaldo",
    component: ConsultaSaldo,
  },
  {
    path: "/cuentas/deposito",
    name: "DepositaCuenta",
    component: DepositaCuenta,
  },
  {
    path: "/cuentas/retiro",
    name: "RetiraCuenta",
    component: RetiraCuenta,
  },
  {
    path: "/cuentas/transferencia",
    name: "TransfiereCuenta",
    component: TransfiereCuenta,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  routes,
});

export default router;