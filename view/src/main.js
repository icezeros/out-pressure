import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from '@/utils/request'

import './core/use'
import bootstrap from './core/bootstrap'
// import '@/permission' // permission control
import '@/utils/filter'
// import { ipcRenderer } from 'electron'
const { ipcRenderer } = window.require('electron')
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

Vue.use(VueAxios, router)

new Vue({
  router,
  store,
  created () {
    // eslint-disable-next-line no-unused-expressions
    bootstrap(), ipcMessage()
  },
  render: h => h(App)
}).$mount('#app')
