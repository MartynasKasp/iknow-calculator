<script setup lang="ts">
import { computed } from 'vue';
import { BookOpen, Hand, PartyPopper, Sparkles } from 'lucide-vue-next';
import { BoardStatus, useBoardStore } from '@/stores/board';
import { usePlayerStore } from '@/stores/player';
import ColorDot from '@/components/ui/ColorDot.vue';

const board = useBoardStore();
const players = usePlayerStore();

const placing = computed(() => {
    if (players.knowFigures.length) return { player: players.knowFigures[0], figure: 'iKNOW' };
    if (players.betFigures.length) return { player: players.betFigures[0], figure: 'iBET' };
    return null;
});

const checking = computed(() => board.boardStatus === BoardStatus.answersCheck);
</script>

<template>
    <div class="mx-auto grid max-w-md gap-2">
        <template v-if="!checking">
            <div class="card card--default flex-row flex-wrap gap-x-5 gap-y-1.5 px-4 py-3 text-sm">
                <span v-if="players.picksCategory" class="inline-flex items-center gap-1.5">
                    <Sparkles class="size-4 text-muted" />
                    <ColorDot :color="players.picksCategory.color" />
                    <strong>{{ players.picksCategory.name }}</strong> picks the category
                </span>
                <span v-if="players.cardReader" class="inline-flex items-center gap-1.5">
                    <BookOpen class="size-4 text-muted" />
                    <ColorDot :color="players.cardReader.color" />
                    <strong>{{ players.cardReader.name }}</strong> reads the card
                </span>
            </div>

            <div
                class="card flex-row items-center gap-3 px-4 py-3"
                :class="placing ? 'card--secondary' : 'bg-accent/15'"
                aria-live="polite"
            >
                <template v-if="placing">
                    <ColorDot :color="placing.player.color" :size="22" square />
                    <span>
                        <strong>{{ placing.player.name }}</strong>, place your
                        <strong>{{ placing.figure }}</strong> figure.
                    </span>
                    <Hand class="ms-auto size-5 text-muted" />
                </template>
                <template v-else>
                    <PartyPopper class="size-5 text-accent" />
                    <span>All figures are down. Time for the answer!</span>
                </template>
            </div>
        </template>

        <div v-else class="card bg-accent/15 flex-row items-center gap-3 px-4 py-3" aria-live="polite">
            <Sparkles class="size-5 shrink-0 text-accent" />
            <span>Tap the iKNOW figures of everyone who got it <strong>right</strong>.</span>
        </div>
    </div>
</template>
