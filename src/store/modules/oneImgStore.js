import api from '@/api';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    image: ''
  },
  actions: {
    async getOneImage({commit}, id) {
      try {
        const resp = await api.getOneImage(id);
        commit('setOneImg', resp.data);
      } catch (error) {
        console.log(error);
        router.push({name: "Gallery"});
      }
    }
  },
  mutations: {
    setOneImg(state, data) {
      state.image = data;
    },
    removeImg(state) {
      state.image = '';
    }
  }
}
