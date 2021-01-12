import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Game from '@/views/Game/index.vue';
import PlayersSetup from '@/views/Players/Setup/index.vue';
import GameBoard from '@/views/Board/index.vue';

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
        component: PlayersSetup,
    },
    {
        path: '/game-board',
        name: 'gameBoard',
        component: GameBoard,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
