import { createStore } from 'vuex';
import { errorModule } from '@/store/errorModule';

export default createStore({
  state () {
    return {
        blacklist: ['Золото', 'Серебро'],
    }
  },
  modules: {
    error: errorModule,
  }
})
