import Vue from 'vue';
import Vuex from 'vuex';
import localStoragePlugin from '@/plugins/localStorage';
import Store from './store';

Vue.use(Vuex);

export default new Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
    plugins: [localStoragePlugin],
});
