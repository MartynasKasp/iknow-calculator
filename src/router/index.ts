import { START_LOCATION, createRouter, createWebHistory } from 'vue-router';
import { GameStatus, useGameStore } from '@/stores/game';
import { clearToasts } from '@/composables/useToast';
import HomeView from '@/views/HomeView.vue';

// Each game status has its own page; the router keeps you on the right one.
const pageForStatus: Record<GameStatus, string> = {
    [GameStatus.playersSetup]: 'playersSetup',
    [GameStatus.gameStarted]: 'gameBoard',
    [GameStatus.gameEnd]: 'gameEnd',
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'homepage', component: HomeView },
        {
            path: '/game',
            name: 'game',
            children: [
                { path: 'players', name: 'playersSetup', component: () => import('@/views/PlayersSetupView.vue') },
                { path: 'board', name: 'gameBoard', component: () => import('@/views/BoardView.vue') },
                { path: 'end', name: 'gameEnd', component: () => import('@/views/GameEndView.vue') },
            ],
        },
        { path: '/:pathMatch(.*)*', name: 'pageNotFound', component: () => import('@/views/NotFoundView.vue') },
    ],
    scrollBehavior(to) {
        if (to.hash) return { el: to.hash, behavior: 'smooth' };
        return { top: 0 };
    },
});

router.beforeEach((to, from) => {
    if (!to.path.startsWith('/game')) return true;

    const game = useGameStore();
    const page = pageForStatus[game.gameStatus];
    if (to.name !== page) return { name: page };

    // Opening the board straight from a page load means there's an unfinished game.
    if (to.name === 'gameBoard' && from === START_LOCATION) {
        game.resumingGame = true;
    }
    return true;
});

// A message about the previous page shouldn't follow you to the next one.
router.afterEach((to, from) => {
    if (to.name !== from.name) clearToasts();
});

export default router;
