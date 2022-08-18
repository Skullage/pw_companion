import { createStore } from 'vuex';
import { errorModule } from '@/store/errorModule';

export default createStore({
  modules: {
    error: errorModule,
  }
})
