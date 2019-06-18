import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import musicModule from './music/index.js'
const store = new Vuex.Store({
    modules: {
      music: musicModule
    }
})

export default store