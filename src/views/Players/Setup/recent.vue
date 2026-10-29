<template>
    <div
        v-if="games.length"
        class="
            md-layout-item
            md-layout
            md-gutter
            md-size-100
            md-alignment-top-center
            PlayersSetup__Recent
        "
    >
        <div class="md-layout-item md-size-100">
            <h5>Play again with</h5>
        </div>

        <div
            v-for="(game, index) in games"
            :key="game.playedAt"
            class="md-layout-item md-small-size-100 md-medium-size-33 md-size-25"
        >
            <div
                class="PlayersSetup__RecentCard"
                role="button"
                tabindex="0"
                :title="`Use these ${game.players.length} players`"
                @click="handleUse(game)"
                @keydown.enter="handleUse(game)"
            >
                <div class="PlayersSetup__RecentHeader">
                    <span class="md-caption">
                        {{ game.players.length }} players · {{ formatDate(game.playedAt) }}
                    </span>
                    <md-button
                        class="md-icon-button md-dense"
                        title="Forget this game"
                        @click.stop="handleForget(index)"
                    >
                        <md-icon>close</md-icon>
                    </md-button>
                </div>

                <ul class="PlayersSetup__RecentPlayers">
                    <li
                        v-for="player in game.players"
                        :key="`${player.color}-${player.name}`"
                    >
                        <span
                            class="PlayersSetup__RecentDot"
                            :style="{ 'background-color': `#${player.color}` }"
                        ></span>
                        {{ player.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import playerModule from '@/modules/Player';
import PlayerHistory, { RecentGameType } from '@/utils/player-history';

@Component
export default class PlayersSetupRecent extends Vue {
    private games: RecentGameType[] = PlayerHistory.getRecentGames();

    handleUse(game: RecentGameType) {
        playerModule.loadPlayersToGame(game.players);
    }

    handleForget(index: number) {
        PlayerHistory.forgetRecentGame(index);
        this.games = PlayerHistory.getRecentGames();
    }

    formatDate(value: string) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
}
</script>
