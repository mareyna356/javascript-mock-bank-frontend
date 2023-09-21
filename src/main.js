import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

/*
//Persistente (variable global para todo el programa)
Vue.prototype.$token = {
  valor: ""
}
*/

//Accede al token con this.$token.valor;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
