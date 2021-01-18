import Vue from 'vue';
import VueMeta from 'vue-meta';
import {
    MdButton, MdField, MdMenu, MdList,
    MdSnackbar, MdIcon, MdDialog, MdApp,
    MdToolbar, MdContent, MdCard, MdDivider,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueMeta);
Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdSnackbar);
Vue.use(MdIcon);
Vue.use(MdDialog);
Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdDivider);

new Vue({
    router,
    store,
    render: (h) => h(App),
    metaInfo: () => ({
        title: 'Home',
        titleTemplate: '%s | iKNOW Points Calculator',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { name: 'iKNOW Points Calculator', content: 'iKNOW board game playing made easier and faster!' },
        ],
    }),
}).$mount('#app');
