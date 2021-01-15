import Vue from 'vue';
import {
    MdButton, MdField, MdMenu, MdList,
    MdSnackbar, MdIcon, MdDialog,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdSnackbar);
Vue.use(MdIcon);
Vue.use(MdDialog);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
