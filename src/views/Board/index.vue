<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <h1>Game board</h1>
        </div>

        <div class="md-layout-item">
            <p v-if="figuresSetup" class="md-subheading">
                <strong>{{ readerName }}</strong> reads the card this round.
            </p>
            <p v-else class="md-subheading">
                Check <strong>iKnow</strong> figures of those, who answered correctly.
            </p>
        </div>

        <GameBoard :gameBoardBox="gameBoardBox" />

        <div class="md-layout-item">
            <md-button
                v-if="figuresSetup"
                class="md-accent md-raised"
                @click="handleCheckAnswers"
            >
                Continue
            </md-button>
            <md-button
                v-else
                class="md-accent md-raised"
                @click="handleCalculatePoints"
            >
                Calculate
            </md-button>
        </div>

        <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showBetSnackbar">
            <span>You cannot bet on yourself.</span>
        </md-snackbar>

        <ResultsDialog />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import gameModule, { GameStatusType } from '@/modules/Game';
import playerModule from '@/modules/Player';
import boardModule, { BoardStatusType } from '@/modules/Board';
import { BoardBoxType, PlayerType } from '@/store/types';
import GameBoard from './board.vue';
import ResultsDialog from './resultsDialog.vue';

@Component({
    components: {
        GameBoard,
        ResultsDialog,
    },
})
export default class Board extends Vue {
    @Get(gameModule) private gameStatus!: GameStatusType;

    @Get(playerModule) private players!: PlayerType[];

    @Get(playerModule) private readerIndex!: number;

    @Sync(boardModule) private showBetSnackbar!: boolean;

    @Get(boardModule) private boardStatus!: BoardStatusType;

    @Get(boardModule) private gameBoardBox!: BoardBoxType[];

    beforeMount() {
        if (this.gameStatus !== GameStatusType.gameStarted) {
            this.$router.push({ name: 'game' });
        }
    }

    get readerName(): string {
        return this.players[this.readerIndex].name;
    }

    get figuresSetup() {
        return this.boardStatus === BoardStatusType.figuresSetup;
    }

    handleCheckAnswers() {
        boardModule.setBoardStatus(BoardStatusType.answersCheck);
    }

    async handleCalculatePoints() {
        const result = await playerModule.calculatePoints(this.gameBoardBox);
        boardModule.setRoundResults(result);
        boardModule.toggleResultsDialog();
        return result;
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>
