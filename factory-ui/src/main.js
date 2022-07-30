import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta';
import { store } from './store/main_store';
import VueRouter from "vue-router";
import {routes} from './routes'
import { Vuelidate } from 'vuelidate'

Vue.config.productionTip = false;
Vue.use(VueMeta)
Vue.use(VueRouter)
Vue.use(Vuelidate)

const router = new VueRouter({
  routes,
  mode:"history"
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
