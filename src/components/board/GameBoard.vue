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
    <!-- Like the real board: "+" bets on the left, "-" bets on the right. -->
    <div class="flex items-center justify-center gap-2 select-none sm:gap-6" :class="{ 'is-checking': checking }">
        <span class="sign" aria-hidden="true">+</span>

        <div>
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
                    <!-- Point dots, laid out like on the real board. A figure covers them. -->
                    <span
                        v-if="!box.playerKnowFigure"
                        class="points"
                        :class="`points--${box.points}`"
                        :aria-label="`${box.points} points`"
                    >
                        <span v-for="point in box.points" :key="point" class="point"></span>
                    </span>
                    <Transition name="pop">
                        <span v-if="box.knowAnswer" class="check">
                            <Check class="size-[70%] drop-shadow-[0_1px_2px_rgb(0_0_0/0.5)]" :stroke-width="4.5" />
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

        <span class="sign" aria-hidden="true">&minus;</span>
    </div>
</template>

<style scoped>
.sign {
    font-size: clamp(2.25rem, 10vw, 7rem);
    font-weight: 300;
    line-height: 1;
    color: var(--board-line);
}

.figure {
    /* As big as the screen allows, shrinking on short or narrow screens. */
    --size: clamp(60px, min(20vw, calc((100dvh - 300px) / 6)), 100px);
    --dot: calc(var(--size) * 0.14);
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
    background-color: var(--board-slot);
}

.figure--empty:hover:not(:disabled) {
    background-color: color-mix(in oklab, var(--board-slot) 85%, var(--foreground));
}

.figure:disabled {
    cursor: default;
}

.is-checking .figure--bet {
    opacity: 0.7;
}

.is-checking .figure--know.figure--empty {
    opacity: 0.55;
}

.is-checking .figure--know:not(.figure--empty) {
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 35%, transparent);
}

.points {
    position: absolute;
    inset: 0;
    margin: auto;
    display: grid;
    width: calc(var(--dot) * 2.6);
    height: calc(var(--dot) * 2.4);
    grid-template: repeat(2, var(--dot)) / repeat(2, var(--dot));
    place-content: center;
    gap: calc(var(--dot) * 0.4);
}

.point {
    width: var(--dot);
    height: var(--dot);
    border-radius: 9999px;
    background: var(--board-line);
}

/* 1 point: a single dot in the middle. */
.points--1 {
    grid-template: var(--dot) / var(--dot);
}

/* 2 points: two dots on a diagonal. */
.points--2 .point:nth-child(1) {
    grid-area: 1 / 2;
}

.points--2 .point:nth-child(2) {
    grid-area: 2 / 1;
}

/* 3 points: a triangle, one dot on top and two below. */
.points--3 .point:nth-child(1) {
    grid-column: 1 / 3;
    justify-self: center;
}

.check {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: white;
    background: color-mix(in oklab, black 20%, transparent);
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
