// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files

import Vue from "vue";
import VModal from "vue-js-modal";
import movable from "v-movable"
import Permissions from "src/plugins/Permissions";

Vue.use(VModal)
Vue.use(movable)
Vue.use(Permissions)


export default (/* { app, router, Vue ... } */) => {
  // something to do
}
