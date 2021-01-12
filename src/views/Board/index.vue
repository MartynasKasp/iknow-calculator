<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <h1>Game board</h1>
        </div>

        <div class="md-layout-item">
            <span><strong>{{ readerName }}</strong> reads the card this round.</span>
        </div>

        <GameBoard />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get } from '@/utils/vuex-module-mutators';
import gameModule, { GameStatusType } from '@/modules/Game';
import playerModule from '@/modules/Player';
import { PlayerType } from '@/store/types';
import GameBoard from './board.vue';

@Component({
    components: {
        GameBoard,
    },
})
export default class Board extends Vue {
    @Get(gameModule) private gameStatus!: GameStatusType;

    @Get(playerModule) private players!: PlayerType[];

    @Get(playerModule) private readerIndex!: number;

    beforeMount() {
        if (this.gameStatus !== GameStatusType.gameStarted) {
            this.$router.push({ name: 'game' });
        }
    }

    get readerName(): string {
        return this.players[this.readerIndex].name;
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>
