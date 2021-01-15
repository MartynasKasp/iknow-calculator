<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <h1>Game end screen</h1>
        </div>

        <div class="md-layout-item">
            <h2>{{ gameWinner }} won the game</h2>
        </div>

        <div class="md-layout-item">
            <div
                v-for="player in sortedPlayers"
                :key="player.color"
            >
                {{ player.name }} {{ player.points }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get } from '@/utils/vuex-module-mutators';
import playerModule from '@/modules/Player';
import { PlayerType } from '@/store/types';

@Component
export default class GameEnd extends Vue {
    @Get(playerModule) private players!: PlayerType[];

    get sortedPlayers() {
        return this.players.sort((a, b) => (a.points > b.points ? -1 : 1));
    }

    get gameWinner() {
        return this.sortedPlayers[0].name;
    }
}
</script>
