import Vue from 'vue';
import Vuex from 'vuex';
// MODULES
import galleryStore from '@/store/modules/galleryStore';
import oneImgStore from '@/store/modules/oneImgStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    galleryStore,
    oneImgStore
  }
});
