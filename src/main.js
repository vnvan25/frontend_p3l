import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';
import PictureInput from 'vue-picture-input';

Vue.prototype.$http = Axios;
Vue.prototype.$axios = Axios;
Vue.prototype.$apiUrl = 'http://127.0.0.1:5002/API2/index.php';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: { App,
  PictureInput }
}).$mount('#app')
