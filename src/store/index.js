import { createStore } from 'vuex';
import axios from 'axios';
import { errorModule } from '@/store/errorModule';
import { genieModule } from '@/store/genieModule';

export default createStore({
    state () {
        return {
            blacklist: ['Золото', 'Серебро'],
            classes: [],
            baseServerUrl: 'http://localhost:5000/',
        }
    },
    mutations: {
        async setClasses(state) {
            try {
                const response = await axios.get(state.baseServerUrl + "classes");
                state.classes = response.data;
            } catch (err) {
                console.log(err);
            }
        }
    },
    actions: {
          getClasses({commit}) {
             commit('setClasses');
          }
    },
    modules: {
        error: errorModule,
        genie: genieModule,
    }
})
