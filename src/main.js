import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"

Vue.prototype.$getSafe = fn => {
  try {
    return fn()
    // eslint-disable-next-line no-empty
  } catch (_) {}
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app")
