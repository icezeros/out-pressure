/* eslint-disable no-sequences */
// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
// import './permission' // permission control
import './utils/filter' // global filter

function ipcMessage () {
  ipcRenderer.send('asynchronous-message', 'ping')
  ipcRenderer.on('pressure', (event, arg) => {
    console.log('============  =============')
    console.log()

    console.log(arg) // prints "pong"
    // event.sender.send('asynchronous-message', 'ping')

    store.dispatch('SetPressure', arg)
  })
}

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created () {
    // eslint-disable-next-line no-unused-expressions
    bootstrap(), ipcMessage()
  },
  render: h => h(App)
}).$mount('#app')
