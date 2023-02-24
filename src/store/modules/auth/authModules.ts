const state = {
  isAuthenticated: false,
};

const getters = {
  getAuthenticated: (state: any) => state.isAuthenticated,
};

const actions = {
  login({ commit }: any, status: boolean) {
    commit("SET_AUTHENTICATION", status);
    console.log(status);
  },
};

const mutations = {
  SET_AUTHENTICATION(state: any, status: boolean) {
    state.isAuthenticated = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
