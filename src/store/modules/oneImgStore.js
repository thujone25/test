import api from '@/api';

export default {
  namespaced: true,
  state: {
    image: ''
  },
  actions: {
    async getOneImage({commit}, id) {
      const resp = await api.getOneImage(id);
      commit('setOneImg', resp.data);
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
