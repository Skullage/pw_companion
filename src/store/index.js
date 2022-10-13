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
            baseServerUrl: config.UrlAPI,
        }
    },
    mutations: {
        setClasses(state, response) {
            state.classes = response.data;
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
        }
    },
    modules: {
        error: errorModule,
        genie: genieModule,
    }
})
