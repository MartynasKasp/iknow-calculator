<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-layout md-size-100">
            <div class="
                Board__RoundInfo
                md-layout-item
                md-xsmall-size-90
                md-small-size-70
                md-size-30"
            >
                <md-card v-if="figuresSetup">
                    <md-card-content>
                        <strong>{{ picksCategory }}</strong> picks the category.<br/>
                        <strong>{{ readerName }}</strong> reads the card this round.
                    </md-card-content>
                </md-card>
                <md-card v-else>
                    <md-card-content>
                        Check <strong>iKnow</strong> figures of those, who answered correctly.
                    </md-card-content>
                </md-card>
            </div>

            <GameBoard :gameBoardBox="gameBoardBox" />

            <div class="md-layout-item">
                <md-button
                    v-if="figuresSetup"
                    class="md-accent md-fab"
                    @click="handleCheckAnswers"
                >
                    <md-icon>navigate_next</md-icon>
                </md-button>
                <md-button
                    v-else
                    class="md-accent md-fab"
                    @click="handleCalculatePoints"
                >
                    <md-icon>calculate</md-icon>
                </md-button>
            </div>

            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showBetSnackbar">
                <span>You cannot bet on yourself.</span>
            </md-snackbar>

            <md-snackbar
                md-position="center"
                :md-duration="4000"
                :md-active.sync="showFiguresSnackbar"
            >
                <span>Every bet and know figure must be placed.</span>
            </md-snackbar>

            <ResultsDialog />
        </div>
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

    @Get(playerModule) private categoryPicker!: number;

    @Sync(boardModule) private showBetSnackbar!: boolean;

    @Get(boardModule) private boardStatus!: BoardStatusType;

    @Get(boardModule) private gameBoardBox!: BoardBoxType[];

    @Sync(boardModule) private showFiguresSnackbar!: boolean;

    @Get(playerModule) private knowFigures!: PlayerType[];

    @Get(playerModule) private betFigures!: PlayerType[];

    beforeMount() {
        if (this.gameStatus !== GameStatusType.gameStarted) {
            this.$router.push({ name: 'game' });
        }
    }

    get readerName(): string {
        return this.players[this.readerIndex].name;
    }

    get picksCategory(): string {
        return this.players[this.categoryPicker].name;
    }

    get figuresSetup() {
        return this.boardStatus === BoardStatusType.figuresSetup;
    }

    handleCheckAnswers() {
        if (this.betFigures.length === 0 && this.knowFigures.length === 0) {
            boardModule.setBoardStatus(BoardStatusType.answersCheck);
        } else {
            boardModule.toggleFiguresSnackbar();
        }
    }

    async handleCalculatePoints() {
        await playerModule.calculatePoints(this.gameBoardBox);
        if (await playerModule.isGameOver()) {
            gameModule.setGameStatus(GameStatusType.gameEnd);
            this.$router.push({ name: 'gameEnd' });
        } else {
            boardModule.toggleResultsDialog();
        }
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>
