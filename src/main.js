import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '@/assets/styles/scss/style.scss';
import 'vue-select/dist/vue-select.css';

createApp(App).use(router).use(store).mount('#app')
