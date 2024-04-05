import { createStore } from 'vuex';

const store = createStore({
    state: {
        username: '',
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
    },
    actions: {
        setUserName({ commit }, username) {
            commit('setUsername', username);
        },


    },
});

export default store;
