import Vue from 'vue';
import VueMeta from 'vue-meta';
import {
    MdButton, MdField, MdMenu, MdList,
    MdSnackbar, MdIcon, MdDialog, MdApp,
    MdToolbar, MdContent, MdCard, MdDivider,
    MdSpeedDial,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';
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
Vue.use(MdSpeedDial);

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
            { name: 'description', content: 'iKNOW board game playing made easier and faster!' },
            { name: 'author', content: 'MartynasKasp' },
            { name: 'keywords', content: 'iknow, iknow board game, iknow calculator, iknow board game calculator, iknow points calculator, iknow points, iknow online, iknow points online, iknow game, iknow board, tactic, tactic iknow' },
        ],
    }),
}).$mount('#app');
