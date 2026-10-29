<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import {
    ArrowLeft, Calculator, Eye, Flag, Minus, Plus, Trophy,
} from 'lucide-vue-next';
import { BoardStatus, useBoardStore } from '@/stores/board';
import { usePlayerStore } from '@/stores/player';
import { GameStatus, useGameStore } from '@/stores/game';
import { POINTS_WINNER } from '@/stores/constants';
import { showToast } from '@/composables/useToast';
import GameTopBar from '@/components/GameTopBar.vue';
import ActionBar from '@/components/ActionBar.vue';
import GameBoard from '@/components/board/GameBoard.vue';
import RoundInfo from '@/components/board/RoundInfo.vue';
import AppModal from '@/components/ui/AppModal.vue';
import ColorDot from '@/components/ui/ColorDot.vue';

useHead({ title: 'Game on' });

const router = useRouter();
const game = useGameStore();
const board = useBoardStore();
const players = usePlayerStore();

const checking = computed(() => board.boardStatus === BoardStatus.answersCheck);
const leader = computed(() => players.standings[0]);
const roundResults = computed(() => [...players.players].sort((a, b) => b.roundResult - a.roundResult));

const revealAnswers = () => {
    if (players.knowFigures.length || players.betFigures.length) {
        showToast('Not so fast!', {
            description: 'Every iKNOW and iBET figure needs a spot first.',
            tone: 'warning',
        });
        return;
    }
    board.boardStatus = BoardStatus.answersCheck;
};

const countPoints = () => {
    players.calculatePoints(board.gameBoardBox);
    if (players.winner) {
        game.gameStatus = GameStatus.gameEnd;
        router.push({ name: 'gameEnd' });
    } else {
        board.showResults = true;
    }
};

const nextRound = () => {
    players.startNextRound();
    board.startNextRound();
};

const endGame = () => {
    board.showGameEnd = false;
    players.clearGame();
    board.resetBoard();
    game.gameStatus = GameStatus.playersSetup;
    router.push({ name: 'homepage' });
};

const startFresh = () => {
    game.resumingGame = false;
    players.clearGame();
    board.resetBoard();
    game.gameStatus = GameStatus.playersSetup;
    router.push({ name: 'playersSetup' });
};

const signed = (value: number) => (value > 0 ? `+${value}` : `${value}`);
</script>

<template>
    <div class="min-h-dvh pb-28">
        <GameTopBar
            title="Game on!"
            :subtitle="leader ? `${leader.name} leads with ${leader.points} of ${POINTS_WINNER} points` : undefined"
            @home="board.showGameEnd = true"
        >
            <template #end>
                <button class="button button--ghost button--icon-only button--sm" aria-label="Scoreboard" @click="board.showSettings = true">
                    <Trophy class="size-5" />
                </button>
            </template>
        </GameTopBar>

        <main class="mx-auto max-w-3xl space-y-5 px-4 pt-4">
            <RoundInfo />
            <GameBoard />
        </main>

        <ActionBar>
            <template v-if="!checking">
                <button class="button button--tertiary" @click="board.showGameEnd = true">
                    <Flag class="size-4" /> End game
                </button>
                <button class="button button--primary ms-auto" @click="revealAnswers">
                    <Eye class="size-4" /> Check answers
                </button>
            </template>
            <template v-else>
                <button class="button button--tertiary" @click="board.backToFiguresSetup()">
                    <ArrowLeft class="size-4" /> Back
                </button>
                <button class="button button--primary ms-auto" @click="countPoints">
                    <Calculator class="size-4" /> Count points
                </button>
            </template>
        </ActionBar>

        <AppModal v-model:open="board.showResults" title="Round results" :dismissable="false">
            <ul class="space-y-2">
                <li v-for="player in roundResults" :key="player.color" class="flex items-center gap-3">
                    <ColorDot :color="player.color" :size="16" square />
                    <span class="flex-1 font-medium text-foreground">{{ player.name }}</span>
                    <span
                        class="chip chip--sm chip--soft tabular-nums"
                        :class="player.roundResult > 0 ? 'chip--success' : player.roundResult < 0 ? 'chip--danger' : 'chip--default'"
                    >
                        {{ signed(player.roundResult) }}
                    </span>
                    <span class="w-14 text-end tabular-nums">{{ player.points }} pts</span>
                </li>
            </ul>
            <template #footer>
                <button class="button button--primary" @click="nextRound">Next round</button>
            </template>
        </AppModal>

        <AppModal v-model:open="board.showSettings" title="Scoreboard" description="Made a mistake? Fix anyone's points here.">
            <ul class="mt-2 space-y-2">
                <li v-for="(player, index) in players.players" :key="player.color" class="flex items-center gap-3">
                    <ColorDot :color="player.color" :size="16" square />
                    <span class="min-w-0 flex-1 truncate font-medium text-foreground">{{ player.name }}</span>
                    <button
                        class="button button--secondary button--icon-only button--sm"
                        :aria-label="`One point less for ${player.name}`"
                        @click="players.setPoints(index, player.points - 1)"
                    >
                        <Minus class="size-4" />
                    </button>
                    <span class="w-8 text-center font-semibold tabular-nums text-foreground">{{ player.points }}</span>
                    <button
                        class="button button--secondary button--icon-only button--sm"
                        :aria-label="`One point more for ${player.name}`"
                        @click="players.setPoints(index, player.points + 1)"
                    >
                        <Plus class="size-4" />
                    </button>
                </li>
            </ul>
            <template #footer>
                <button class="button button--primary" @click="board.showSettings = false">Done</button>
            </template>
        </AppModal>

        <AppModal
            v-model:open="board.showGameEnd"
            title="End this game?"
            description="All scores will be wiped. No take-backs!"
        >
            <template #footer>
                <button class="button button--tertiary" @click="board.showGameEnd = false">Keep playing</button>
                <button class="button button--danger" @click="endGame">End game</button>
            </template>
        </AppModal>

        <AppModal
            v-model:open="game.resumingGame"
            title="Welcome back!"
            description="Looks like you left a game halfway. Pick up where you left off?"
        >
            <template #footer>
                <button class="button button--tertiary" @click="startFresh">Start fresh</button>
                <button class="button button--primary" @click="game.resumingGame = false">Resume game</button>
            </template>
        </AppModal>
    </div>
</template>
