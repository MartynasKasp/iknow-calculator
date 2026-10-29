import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.vue';
import router from './router';
import { persistPlugin } from './stores/persist';
import './styles/main.css';

const pinia = createPinia();
pinia.use(persistPlugin);

createApp(App)
    .use(pinia)
    .use(router)
    .use(createHead())
    .mount('#app');

registerSW({ immediate: true });
