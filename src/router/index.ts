import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Game from '@/views/Game/index.vue';
import Players from '@/views/Players/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'game',
        component: Game,
    },
    {
        path: '/players',
        name: 'playersSetup',
        component: Players,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
