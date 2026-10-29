<script setup lang="ts">
import { computed } from 'vue';
import { Check } from 'lucide-vue-next';
import { BoardStatus, useBoardStore } from '@/stores/board';
import { usePlayerStore } from '@/stores/player';
import { showToast } from '@/composables/useToast';
import type { BoardBoxType, PlayerType } from '@/stores/types';

const board = useBoardStore();
const players = usePlayerStore();

const checking = computed(() => board.boardStatus === BoardStatus.answersCheck);

const fill = (player: PlayerType | null) => (player ? { backgroundColor: `#${player.color}` } : {});

const onBet = (box: BoardBoxType, positive: boolean) => {
    const result = board.toggleBet(box.level, positive);
    if (result === 'own-figure') {
        showToast('Nice try!', { description: 'You can\'t bet on your own answer.', tone: 'warning' });
    } else if (result === 'no-know-figure' && players.betFigures.length) {
        showToast('Bets go next to an iKNOW figure.', { description: 'Pick a row that has one.', tone: 'warning' });
    }
};

const knowLabel = (box: BoardBoxType) => {
    const who = box.playerKnowFigure?.name;
    if (checking.value) {
        if (!who) return `Row ${box.level}: empty`;
        return `${who}'s answer, ${box.knowAnswer ? 'marked right' : 'not marked'}`;
    }
    return who ? `Row ${box.level}: ${who}. Tap to take it back.` : `Row ${box.level}: place iKNOW figure`;
};

const betLabel = (box: BoardBoxType, positive: boolean) => {
    const who = box.playerBetFigure[positive ? 'positive' : 'negative']?.name;
    const side = positive ? 'Plus' : 'Minus';
    return who ? `${side} bet on row ${box.level}: ${who}` : `${side} bet on row ${box.level}: empty`;
};
</script>

<template>
    <div class="mx-auto w-fit select-none" :class="{ 'is-checking': checking }">
        <div class="grid grid-cols-3 justify-items-center gap-x-3 pb-2 text-2xl font-bold text-muted sm:gap-x-6">
            <span aria-hidden="true">+</span>
            <span class="self-end text-xs font-medium tracking-wide uppercase">iKNOW</span>
            <span aria-hidden="true">&minus;</span>
        </div>

        <div
            v-for="box in board.gameBoardBox"
            :key="box.level"
            class="grid grid-cols-3 items-center justify-items-center gap-x-3 py-1.5 sm:gap-x-6"
            :style="{ '--line': `${box.level + 1}px` }"
        >
            <button
                class="figure figure--bet"
                :class="{ 'figure--empty': !box.playerBetFigure.positive }"
                :style="fill(box.playerBetFigure.positive)"
                :disabled="checking"
                :aria-label="betLabel(box, true)"
                @click="onBet(box, true)"
            ></button>

            <button
                class="figure figure--know"
                :class="{
                    'figure--empty': !box.playerKnowFigure,
                    'figure--right': box.knowAnswer,
                }"
                :style="fill(box.playerKnowFigure)"
                :disabled="checking && !box.playerKnowFigure"
                :aria-label="knowLabel(box)"
                :aria-pressed="checking ? box.knowAnswer : undefined"
                @click="board.toggleKnow(box.level)"
            >
                <span class="points" :aria-label="`${box.points} points`">
                    <span v-for="point in box.points" :key="point" class="point"></span>
                </span>
                <Transition name="pop">
                    <span v-if="box.knowAnswer" class="check">
                        <Check class="size-1/2" :stroke-width="3" />
                    </span>
                </Transition>
            </button>

            <button
                class="figure figure--bet"
                :class="{ 'figure--empty': !box.playerBetFigure.negative }"
                :style="fill(box.playerBetFigure.negative)"
                :disabled="checking"
                :aria-label="betLabel(box, false)"
                @click="onBet(box, false)"
            ></button>
        </div>
    </div>
</template>

<style scoped>
.figure {
    /* Fit all six rows on a phone screen, between the info cards and the action bar. */
    --size: clamp(46px, min(19vw, calc((100dvh - 490px) / 6)), 88px);
    position: relative;
    width: var(--size);
    height: var(--size);
    border: var(--line) solid var(--board-line);
    border-radius: var(--radius);
    cursor: pointer;
    transition: transform 150ms ease, background-color 150ms ease, border-color 150ms ease, opacity 150ms ease;
}

.figure:active:not(:disabled) {
    transform: scale(0.94);
}

.figure:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
}

.figure--bet {
    border-radius: 9999px;
}

.figure--empty {
    background-color: var(--surface);
}

.figure--empty:hover:not(:disabled) {
    background-color: var(--surface-secondary);
}

.figure:disabled {
    cursor: default;
}

.is-checking .figure--bet {
    opacity: 0.45;
}

.is-checking .figure--know.figure--empty {
    opacity: 0.35;
}

.is-checking .figure--know:not(.figure--empty) {
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 35%, transparent);
}

.points {
    position: absolute;
    top: 6px;
    right: 6px;
    display: flex;
    gap: 3px;
}

.point {
    width: clamp(7px, 2vw, 10px);
    height: clamp(7px, 2vw, 10px);
    border-radius: 9999px;
    background: var(--board-line);
    box-shadow: 0 0 0 1.5px var(--surface);
}

.check {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: white;
    background: color-mix(in oklab, black 30%, transparent);
    border-radius: inherit;
}

.pop-enter-active {
    transition: transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1.4), opacity 120ms ease;
}

.pop-enter-from {
    transform: scale(0.6);
    opacity: 0;
}
</style>
