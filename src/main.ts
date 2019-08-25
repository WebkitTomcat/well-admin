import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/scss/index.scss'
import '@/utils'
import './registerServiceWorker'

import '@/api/request'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUi)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
