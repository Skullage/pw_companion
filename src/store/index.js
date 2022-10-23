import { createStore } from 'vuex';
import axios from 'axios';
import { errorModule } from '@/store/errorModule';
import { genieModule } from '@/store/genieModule';
import config from '@/config/config';

export default createStore({
    state () {
        return {
            blacklist: ['Золото', 'Серебро'],
            classes: [],
            stats: [],
            resources: [],
            baseServerUrl: config.UrlAPI,
            showMenu: true,
        }
    },
    mutations: {
        setClasses(state, response) {
            state.classes = response.data;
        },
        setStats(state, response) {
            state.stats = response.data;
        },
        setResources(state, response) {
            state.resources = response.data;
        },
        toggleMenu(state) {
            state.showMenu = !state.showMenu;
        }
    },
    actions: {
        async getClasses({commit}, baseServerUrl) {
            try {
                const response = await axios.get(baseServerUrl + "classes");
                commit('setClasses', response);
            } catch (err) {
                console.log(err);
                commit('error/setErrorText', `Не удалось получить список классов`);
            }
        },
        async getStats({commit}, baseServerUrl) {
            try {
                const response = await axios.get(baseServerUrl + "stats");
                commit('setStats', response);
            } catch (err) {
                console.log(err);
                commit('error/setErrorText', `Не удалось получить список статов`);
            }
        },
        async getResources({commit}, baseServerUrl) {
            try {
                const response = await axios.get(baseServerUrl + "resources");
                commit('setResources', response);
            } catch (err) {
                console.log(err);
                commit('error/setErrorText', `Не удалось получить список ресурсов`);
            }
        }
    },
    modules: {
        error: errorModule,
        genie: genieModule,
    }
})
