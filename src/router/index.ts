import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home/index.vue';
import Game from '@/views/Game/index.vue';
import PlayersSetup from '@/views/Players/Setup/index.vue';
import GameBoard from '@/views/Board/index.vue';
import GameEnd from '@/views/Game/End/index.vue';
import NotFound from '@/views/NotFound/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'homepage',
        component: Home,
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        children: [
            {
                path: 'players',
                name: 'playersSetup',
                component: PlayersSetup,
            },
            {
                path: 'board',
                name: 'gameBoard',
                component: GameBoard,
            },
            {
                path: 'end',
                name: 'gameEnd',
                component: GameEnd,
            },
        ],
    },
    {
        path: '/not-found',
        name: 'pageNotFound',
        component: NotFound,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
