import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Game from '@/views/Game/index.vue';
import PlayersSetup from '@/views/Players/Setup/index.vue';
import GameBoard from '@/views/Board/index.vue';
import GameEnd from '@/views/Game/End/index.vue';

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
    {
        path: '/game-end',
        name: 'gameEnd',
        component: GameEnd,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
