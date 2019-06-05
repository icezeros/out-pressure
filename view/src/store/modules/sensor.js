import Vue from 'vue'
import { PRESSURE_SET_VALUE } from '@/store/mutation-types'

const sensor = {
  state: {
    pressure: 0
  },
  mutations: {
    PRESSURE_SET_VALUE: (state, type) => {
      state.pressure = type
      Vue.ls.set(PRESSURE_SET_VALUE, type)
    }
  },
  actions: {
    SetPressure ({ commit }, type) {
      commit('PRESSURE_SET_VALUE', type)
    }
  }
}

export default sensor
