<template>
    <div class="md-layout-item">
        <md-speed-dial
            v-if="status"
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
                <md-button @click="showSettingsDialog = true" class="md-icon-button">
                    <md-icon>groups</md-icon>
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import playerModule from '@/modules/Player';
import boardModule, { BoardStatusType } from '@/modules/Board';
import gameModule, { GameStatusType } from '@/modules/Game';
import { BoardBoxType, PlayerType } from '@/store/types';

@Component
export default class BoardSpeedDials extends Vue {
    @Prop({ required: true }) private status!: boolean;

    @Prop({ required: true }) private gameBoardBox!: BoardBoxType[];

    @Get(playerModule) private knowFigures!: PlayerType[];

    @Get(playerModule) private betFigures!: PlayerType[];

    @Sync(boardModule) private showSettingsDialog!: boolean;

    @Sync(boardModule) private showGameEndDialog!: boolean;

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
        boardModule.backToFiguresSetup();
    }
}
</script>
