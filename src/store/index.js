
import Vue from 'vue'
import Vuex from 'vuex'

import master from './modules/master'

Vue.use(Vuex);

const state = {};

const getters = {};

const actions = {};

const mutations = {};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    master
  },
  plugins: []
});

export default store;