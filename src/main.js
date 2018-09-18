import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import VDistpicker from 'v-distpicker'
import BaiduMap from 'vue-baidu-map'

Vue.component('v-distpicker', VDistpicker)
Vue.use(ElementUI)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$md5 = md5
axios.defaults.withCredentials=true;
Vue.use(BaiduMap, {
  ak: 'jMXeCGhKM9szdeWWKVMw6F9xVyE2WceI'
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
