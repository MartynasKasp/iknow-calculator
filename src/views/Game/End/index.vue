<template>
    <div class="GameEnd__Container">
        <div class="md-layout-item">
            <h4>{{ gameWinner }} has won the game!</h4>
        </div>

        <div class="GameEnd__PlayersList md-layout-item">
            <div
                class="GameEnd__PlayerItem"
                v-for="player in sortedPlayers"
                :key="player.color"
            >
                <div class="GameEnd__PlayerColor" :style="elementStyle(player.color)">
                </div>
                <p>
                    <strong>{{ player.name }}</strong>
                    ended the game with
                    <strong>{{ player.points }}</strong> points.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get } from '@/utils/vuex-module-mutators';
import gameModule, { GameStatusType } from '@/modules/Game';
import playerModule from '@/modules/Player';
import { PlayerType } from '@/store/types';
import party from 'party-js';

@Component
export default class GameEnd extends Vue {
    @Get(playerModule) private players!: PlayerType[];

    @Get(gameModule) private gameStatus!: GameStatusType;

    beforeMount() {
        if (this.gameStatus !== GameStatusType.gameEnd) {
            this.$router.push({ name: 'game' });
        }
    }

    mounted() {
        party.screen({
            count: 400,
        });
    }

    get sortedPlayers() {
        return this.players.sort((a, b) => (a.points > b.points ? -1 : 1));
    }

    get gameWinner() {
        return this.sortedPlayers[0].name;
    }

    elementStyle(color: string) {
        return { 'background-color': `#${color}` };
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>
