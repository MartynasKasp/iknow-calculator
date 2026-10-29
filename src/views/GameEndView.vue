<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import party from 'party-js';
import { Crown, House, RotateCcw } from 'lucide-vue-next';
import { usePlayerStore } from '@/stores/player';
import { GameStatus, useGameStore } from '@/stores/game';
import { useBoardStore } from '@/stores/board';
import ColorDot from '@/components/ui/ColorDot.vue';
import ActionBar from '@/components/ActionBar.vue';

useHead({ title: 'We have a winner' });

const router = useRouter();
const game = useGameStore();
const board = useBoardStore();
const players = usePlayerStore();

const champion = ref<HTMLElement>();
const winner = computed(() => players.standings[0]);

onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (champion.value && !reduceMotion) {
        party.confetti(champion.value, { count: party.variation.range(60, 90) });
    }
});

const rematch = () => {
    players.restartGame();
    board.resetBoard();
    game.gameStatus = GameStatus.gameStarted;
    router.push({ name: 'gameBoard' });
};

const goHome = () => {
    players.clearGame();
    board.resetBoard();
    game.gameStatus = GameStatus.playersSetup;
    router.push({ name: 'homepage' });
};
</script>

<template>
    <div class="min-h-dvh pb-28">
        <main class="mx-auto max-w-md px-4 pt-14 text-center">
            <div ref="champion" class="mx-auto grid size-20 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg">
                <Crown class="size-10" />
            </div>
            <h1 class="mt-6 text-3xl font-bold text-balance sm:text-4xl">
                {{ winner?.name }} wins!
            </h1>
            <p class="mt-2 text-muted">What a game. Here's how everyone did:</p>

            <ol class="mt-8 space-y-2 text-start">
                <li
                    v-for="(player, index) in players.standings"
                    :key="player.color"
                    class="card flex-row items-center gap-3 px-4 py-3"
                    :class="index === 0 ? 'bg-accent/15 ring-1 ring-accent/40' : 'card--default'"
                >
                    <span class="w-6 text-center font-bold text-muted tabular-nums">{{ index + 1 }}</span>
                    <ColorDot :color="player.color" :size="18" square />
                    <span class="flex-1 truncate font-semibold">{{ player.name }}</span>
                    <span class="tabular-nums">{{ player.points }} pts</span>
                </li>
            </ol>
        </main>

        <ActionBar>
            <button class="button button--tertiary" @click="goHome">
                <House class="size-4" /> Home
            </button>
            <button class="button button--primary ms-auto" @click="rematch">
                <RotateCcw class="size-4" /> Rematch!
            </button>
        </ActionBar>
    </div>
</template>
