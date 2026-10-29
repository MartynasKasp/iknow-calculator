<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import {
    History, Lock, Plus, Trash2, Users, X,
} from 'lucide-vue-next';
import { usePlayerStore, type AddPlayerErrors } from '@/stores/player';
import { GameStatus, useGameStore } from '@/stores/game';
import { BoardStatus, useBoardStore } from '@/stores/board';
import { FIGURE_COLORS, MAX_PLAYERS, MIN_PLAYERS } from '@/stores/constants';
import PlayerHistory, { type RecentGameType, type SavedPlayerType } from '@/utils/player-history';
import { showToast } from '@/composables/useToast';
import GameTopBar from '@/components/GameTopBar.vue';
import ActionBar from '@/components/ActionBar.vue';
import AppModal from '@/components/ui/AppModal.vue';
import ColorDot from '@/components/ui/ColorDot.vue';
import ColorSelect from '@/components/ui/ColorSelect.vue';
import NameCombobox from '@/components/ui/NameCombobox.vue';

useHead({ title: 'Who\'s playing?' });

const router = useRouter();
const game = useGameStore();
const board = useBoardStore();
const playerStore = usePlayerStore();

const name = ref('');
const color = ref('');
const errors = ref<AddPlayerErrors>({});
const confirmStart = ref(false);
const confirmForget = ref(false);

const savedPlayers = ref<SavedPlayerType[]>(PlayerHistory.getSavedPlayers());
const recentGames = ref<RecentGameType[]>(PlayerHistory.getRecentGames());

const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

const availableColors = computed(() => FIGURE_COLORS
    .filter((option) => !playerStore.players.some((player) => player.color === option.value)));

// Saved players who aren't at the table yet.
const suggestions = computed(() => savedPlayers.value
    .filter((saved) => !playerStore.players.some((player) => sameName(player.name, saved.name))));

const colorIsFree = (value: string) => availableColors.value.some((option) => option.value === value);

// Picking or typing a known name also picks that player's usual color, if it's free.
const useSavedColor = (player?: SavedPlayerType) => {
    if (player && !color.value && colorIsFree(player.color)) {
        color.value = player.color;
    }
};

watch(name, (value) => {
    useSavedColor(savedPlayers.value.find((player) => sameName(player.name, value)));
    if (errors.value.name) errors.value = { ...errors.value, name: undefined };
});

watch(color, () => {
    if (errors.value.color) errors.value = { ...errors.value, color: undefined };
});

const addPlayer = () => {
    errors.value = playerStore.addPlayer(name.value, color.value);
    if (Object.keys(errors.value).length === 0) {
        name.value = '';
        color.value = '';
    }
};

const useRecentGame = (recent: RecentGameType) => {
    playerStore.loadPlayers(recent.players);
    errors.value = {};
    name.value = '';
    color.value = '';
    showToast('The gang\'s all here!', { tone: 'accent' });
};

const forgetRecentGame = (index: number) => {
    PlayerHistory.forgetRecentGame(index);
    recentGames.value = PlayerHistory.getRecentGames();
};

const hasHistory = computed(() => savedPlayers.value.length > 0 || recentGames.value.length > 0);

const forgetEverything = () => {
    PlayerHistory.forgetAll();
    savedPlayers.value = [];
    recentGames.value = [];
    confirmForget.value = false;
    showToast('Poof! Saved players are gone.', { description: 'Fresh start on this device.' });
};

const formatDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? ''
        : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const askToStart = () => {
    if (playerStore.players.length < MIN_PLAYERS) {
        showToast('You need at least 2 players.', { description: 'Grab a friend (or two)!', tone: 'warning' });
        return;
    }
    confirmStart.value = true;
};

const startGame = () => {
    PlayerHistory.rememberGame(playerStore.players);
    playerStore.completeSetup();
    board.boardStatus = BoardStatus.figuresSetup;
    game.gameStatus = GameStatus.gameStarted;
    confirmStart.value = false;
    router.push({ name: 'gameBoard' });
};
</script>

<template>
    <div class="min-h-dvh pb-28">
        <GameTopBar title="Who's playing?" @home="router.push({ name: 'homepage' })" />

        <main class="mx-auto max-w-3xl space-y-8 px-4 pt-6">
            <section v-if="recentGames.length" aria-labelledby="recent-heading">
                <h2 id="recent-heading" class="flex items-center gap-2 text-sm font-semibold text-muted">
                    <History class="size-4" /> Same crew as last time?
                </h2>
                <ul class="mt-3 grid gap-3 sm:grid-cols-3">
                    <li v-for="(recent, index) in recentGames" :key="recent.playedAt" class="relative">
                        <button
                            class="card card--default h-full w-full cursor-pointer gap-2 pe-9 text-start transition hover:bg-surface-secondary focus-visible:status-focused"
                            :aria-label="`Play with ${recent.players.map((p) => p.name).join(', ')}`"
                            @click="useRecentGame(recent)"
                        >
                            <span class="text-xs text-muted">
                                {{ recent.players.length }} players · {{ formatDate(recent.playedAt) }}
                            </span>
                            <span class="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                                <span v-for="player in recent.players" :key="player.color" class="inline-flex items-center gap-1.5">
                                    <ColorDot :color="player.color" :size="10" />
                                    {{ player.name }}
                                </span>
                            </span>
                        </button>
                        <button
                            class="close-button close-button--default absolute end-2 top-2"
                            aria-label="Forget this game"
                            @click="forgetRecentGame(index)"
                        >
                            <X class="size-3.5" />
                        </button>
                    </li>
                </ul>
            </section>

            <section class="card card--default gap-4 p-5" aria-labelledby="add-heading">
                <div class="card__header">
                    <h2 id="add-heading" class="card__title text-base">Add a player</h2>
                    <p class="card__description">2 to 6 players. Grab your figures and pick a color.</p>
                </div>

                <form class="grid items-start gap-3 sm:grid-cols-[1fr_1fr_auto]" @submit.prevent="addPlayer">
                    <NameCombobox
                        v-model="name"
                        label="Name"
                        :suggestions="suggestions"
                        :error="errors.name"
                        :disabled="playerStore.isFull"
                        @pick="useSavedColor"
                        @submit="addPlayer"
                    />
                    <ColorSelect
                        v-model="color"
                        label="Figure color"
                        :options="availableColors"
                        :error="errors.color"
                        :disabled="playerStore.isFull"
                    />
                    <button
                        type="submit"
                        class="button button--primary sm:mt-6"
                        :disabled="playerStore.isFull"
                    >
                        <Plus class="size-4" /> Add
                    </button>
                </form>
            </section>

            <section aria-labelledby="table-heading">
                <h2 id="table-heading" class="flex items-center gap-2 text-sm font-semibold text-muted">
                    <Users class="size-4" />
                    At the table
                    <span class="chip chip--default chip--sm">{{ playerStore.players.length }}/{{ MAX_PLAYERS }}</span>
                </h2>

                <div
                    v-if="!playerStore.players.length"
                    class="mt-3 rounded-xl border border-dashed border-border px-4 py-10 text-center text-muted"
                >
                    Nobody's here yet. Add at least two players to get the party started.
                </div>

                <TransitionGroup v-else tag="ul" name="list" class="mt-3 space-y-2">
                    <li
                        v-for="(player, index) in playerStore.players"
                        :key="player.color"
                        class="card card--default flex-row items-center gap-3 px-4 py-3"
                    >
                        <ColorDot :color="player.color" :size="28" square />
                        <div class="min-w-0 flex-1">
                            <div class="truncate font-semibold">{{ player.name }}</div>
                            <div v-if="index === 0" class="text-xs text-muted">Reads the first card</div>
                        </div>
                        <button
                            class="button button--ghost button--icon-only button--sm text-danger"
                            :aria-label="`Remove ${player.name}`"
                            @click="playerStore.removePlayer(index)"
                        >
                            <Trash2 class="size-4" />
                        </button>
                    </li>
                </TransitionGroup>
            </section>

            <section class="flex items-start gap-3 rounded-xl bg-surface-secondary/60 px-4 py-3 text-sm text-muted">
                <Lock class="mt-0.5 size-4 shrink-0" />
                <div class="flex-1">
                    <p>
                        Players and recent games are saved on this device only.
                        Nothing is sent anywhere.
                    </p>
                    <button
                        v-if="hasHistory"
                        class="link mt-1 font-medium text-foreground underline underline-offset-2"
                        @click="confirmForget = true"
                    >
                        Forget saved players
                    </button>
                </div>
            </section>
        </main>

        <ActionBar>
            <span class="text-sm text-muted">
                {{ playerStore.players.length < MIN_PLAYERS
                    ? `${MIN_PLAYERS - playerStore.players.length} more to go`
                    : 'Looking good!' }}
            </span>
            <button class="button button--primary ms-auto" @click="askToStart">Let's play</button>
        </ActionBar>

        <AppModal
            v-model:open="confirmForget"
            title="Forget saved players?"
            description="This clears saved players and your recent line-ups from this device. Anyone at the table right now stays put."
        >
            <template #footer>
                <button class="button button--tertiary" @click="confirmForget = false">Keep them</button>
                <button class="button button--danger" @click="forgetEverything">Forget them</button>
            </template>
        </AppModal>

        <AppModal v-model:open="confirmStart" title="Ready to roll?">
            <p>
                Starting a game with <strong class="text-foreground">{{ playerStore.players.length }} players</strong>.
                <strong class="text-foreground">{{ playerStore.players[0]?.name }}</strong> reads the first card.
            </p>
            <template #footer>
                <button class="button button--tertiary" @click="confirmStart = false">Not yet</button>
                <button class="button button--primary" @click="startGame">Let's go!</button>
            </template>
        </AppModal>
    </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-12px);
}
</style>
