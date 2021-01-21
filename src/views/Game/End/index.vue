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

        <md-speed-dial class="md-bottom-right" md-direction="top">
            <md-speed-dial-target>
                <md-icon class="md-morph-initial">navigate_next</md-icon>
                <md-icon class="md-morph-final">expand_less</md-icon>
            </md-speed-dial-target>

            <md-speed-dial-content>
                <md-button @click="handleRestartGame" class="md-icon-button">
                    <md-icon>refresh</md-icon>
                </md-button>

                <md-button @click="handleOpenHome" class="md-icon-button">
                    <md-icon>home</md-icon>
                </md-button>
            </md-speed-dial-content>
        </md-speed-dial>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get } from '@/utils/vuex-module-mutators';
import gameModule, { GameStatusType } from '@/modules/Game';
import playerModule from '@/modules/Player';
import boardModule from '@/modules/Board';
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
            count: this.$el.clientWidth / 5,
        });
    }

    get sortedPlayers() {
        return [...this.players].sort((a, b) => (a.points > b.points ? -1 : 1));
    }

    get gameWinner() {
        return this.sortedPlayers[0].name;
    }

    async handleRestartGame() {
        await playerModule.restartGame();
        gameModule.setGameStatus(GameStatusType.gameStarted);
        await boardModule.restartGame();
        this.$router.push({ name: 'gameBoard' });
    }

    handleOpenHome() {
        playerModule.clearGame();
        gameModule.setGameStatus(GameStatusType.playersSetup);
        boardModule.restartGame();
        this.$router.push({ name: 'homepage' });
    }

    elementStyle(color: string) {
        return { 'background-color': `#${color}` };
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>
