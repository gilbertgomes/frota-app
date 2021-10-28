import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from "axios"
import VueAxios from "vue-axios"
import VueTheMask from "vue-the-mask"
import '@mdi/font/css/materialdesignicons.css'


const EventBus = new Vue();
export default EventBus;

Vue.prototype.$appName = process.env.VUE_APP_TITLE;
Vue.prototype.$http = process.env.VUE_APP_HOST;

Vue.config.productionTip = false

axios.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        return config;
    },
    (err) => {
        console.log(err);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
    }
);

Vue.use(VueAxios, axios);
Vue.use(VueTheMask);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
