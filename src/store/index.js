import { createStore } from 'vuex'
import createPeristedState from 'vuex-persistedstate'
import { auth } from './modules/auth'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  },

  plugins: [createPeristedState({
    paths: ['auth']
  })],
})
