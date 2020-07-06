import api from '@/api';

export default {
  namespaced: true,
  state: {
    images: [],
    page: 1,
    totalPages: 0
  },
  actions: {
    async getImages({commit, state}) {
      const resp = await api.getImages(state.page);
      commit('setImages', resp.data.pictures);
    },
    async loadMoreImages({commit, dispatch}) {
      commit('incrementPage');
      await dispatch('getImages');
    }
  },
  mutations: {
    setTotalPages(state, total) {
      state.totalPages = total;
    },
    setImages(state, data) {
      state.images = [...state.images, ...data];
    },
    incrementPage(state) {
      state.page += 1;
    }
  }
}
