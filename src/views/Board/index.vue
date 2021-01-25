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
                <div v-if="figuresSetup">
                    <md-card>
                        <md-card-content>
                            <PlayerInfo
                                :player="cardReader"
                                followingText="picks the category."
                            />
                            <PlayerInfo
                                :player="picksCategory"
                                followingText="reads the card this round."
                            />
                        </md-card-content>
                    </md-card>

                    <md-card v-if="knowFigures.length">
                        <md-card-content>
                            <PlayerInfo
                                :player="placingKnowFigure"
                                leadingText="Place"
                                followingText="iKNOW figure."
                            />
                        </md-card-content>
                    </md-card>

                    <md-card v-else-if="betFigures.length">
                        <md-card-content>
                            <PlayerInfo
                                :player="placingBetFigure"
                                leadingText="Place"
                                followingText="iBET figure."
                            />
                        </md-card-content>
                    </md-card>
                </div>
                <md-card v-else>
                    <md-card-content>
                        Check <strong>iKNOW</strong> figures of those, who answered correctly.
                    </md-card-content>
                </md-card>
            </div>

            <GameBoard :gameBoardBox="gameBoardBox" />

            <div class="md-layout-item">
                <md-speed-dial
                    v-if="figuresSetup"
                    class="md-bottom-left"
                    md-direction="top"
                >
                    <md-speed-dial-target>
                        <md-icon>menu</md-icon>
                    </md-speed-dial-target>

                    <md-speed-dial-content>
                        <md-button @click="handleCheckAnswers" class="md-icon-button">
                            <md-icon>navigate_next</md-icon>
                        </md-button>
                    </md-speed-dial-content>

                    <md-speed-dial-content>
                        <md-button class="md-icon-button">
                            <md-icon>settings</md-icon>
                        </md-button>
                    </md-speed-dial-content>

                    <md-speed-dial-content>
                        <md-button @click="showGameEndDialog = true" class="md-icon-button">
                            <md-icon>home</md-icon>
                        </md-button>
                    </md-speed-dial-content>
                </md-speed-dial>

                <md-speed-dial
                    v-else
                    class="md-bottom-left"
                    md-direction="top"
                >
                    <md-speed-dial-target>
                        <md-icon>menu</md-icon>
                    </md-speed-dial-target>

                    <md-speed-dial-content>
                        <md-button @click="handleCalculatePoints" class="md-icon-button">
                            <md-icon>calculate</md-icon>
                        </md-button>
                    </md-speed-dial-content>

                    <md-speed-dial-content>
                        <md-button @click="handleGoBack" class="md-icon-button">
                            <md-icon>undo</md-icon>
                        </md-button>
                    </md-speed-dial-content>

                    <md-speed-dial-content>
                        <md-button @click="showGameEndDialog = true" class="md-icon-button">
                            <md-icon>home</md-icon>
                        </md-button>
                    </md-speed-dial-content>
                </md-speed-dial>
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
            <GameEndDialog />
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
import PlayerInfo from '@/projectComponents/player/player.vue';
import GameBoard from './board.vue';
import ResultsDialog from './resultsDialog.vue';
import GameEndDialog from './gameEndDialog.vue';

@Component({
    metaInfo: {
        title: 'Game in progress',
    },
    components: {
        GameBoard,
        ResultsDialog,
        PlayerInfo,
        GameEndDialog,
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

    @Sync(boardModule) private showGameEndDialog!: boolean;

    beforeMount() {
        if (this.gameStatus !== GameStatusType.gameStarted) {
            this.$router.push({ name: 'game' });
        }
    }

    get cardReader(): PlayerType {
        return this.players[this.readerIndex];
    }

    get picksCategory(): PlayerType {
        return this.players[this.categoryPicker];
    }

    get figuresSetup() {
        return this.boardStatus === BoardStatusType.figuresSetup;
    }

    get placingKnowFigure() {
        return this.knowFigures[0];
    }

    get placingBetFigure() {
        return this.betFigures[0];
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

    handleGoBack() {
        boardModule.setBoardStatus(BoardStatusType.figuresSetup);
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>
