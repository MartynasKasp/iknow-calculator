import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home/index.vue';
import Game from '@/views/Game/index.vue';
import PlayersSetup from '@/views/Players/Setup/index.vue';
import GameBoard from '@/views/Board/index.vue';
import GameEnd from '@/views/Game/End/index.vue';
import NotFound from '@/views/NotFound/index.vue';
import gameModule from '@/modules/Game';

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
        path: '*',
        name: 'pageNotFound',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach((to, from, next) => {
    if (to.name === 'gameBoard' && !from.name) {
        gameModule.setResumingGame(true);
        next();
    } else {
        next();
    }
});

export default router;
