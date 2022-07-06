import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import "vue-select/dist/vue-select.css";
import VueToast from 'vue-toast-notification';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import PortalVue from 'portal-vue'
import vSelect from 'vue-select'

// register VueFusionCharts component

Vue.use(PortalVue)
Vue.component("v-select", vSelect);

Vue.use(VueToast)
Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'places'
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
