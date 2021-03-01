<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-layout md-size-100">
            <RoundInfo :status="figuresSetup" />
            <GameBoard :gameBoardBox="gameBoardBox" />

            <RoundSpeedDials :gameBoardBox="gameBoardBox" :status="figuresSetup" />

            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showBetSnackbar">
                <span>You cannot bet on yourself.</span>
            </md-snackbar>

            <md-snackbar
                md-position="center"
                :md-duration="4000"
                :md-active.sync="showFiguresSnackbar"
            >
                <span>Every iBET and iKNOW figure must be placed.</span>
            </md-snackbar>

            <ResultsDialog />
            <GameEndDialog />
            <SettingsDialog />
            <ResumeDialog />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import gameModule, { GameStatusType } from '@/modules/Game';
import boardModule, { BoardStatusType } from '@/modules/Board';
import { BoardBoxType } from '@/store/types';
import GameBoard from './board.vue';
import RoundInfo from './info.vue';
import RoundSpeedDials from './speedDials.vue';
import ResultsDialog from './dialogs/resultsDialog.vue';
import GameEndDialog from './dialogs/gameEndDialog.vue';
import SettingsDialog from './dialogs/settingsDialog.vue';
import ResumeDialog from './dialogs/resumeDialog.vue';

@Component({
    metaInfo: {
        title: 'Game in progress',
    },
    components: {
        GameBoard,
        RoundInfo,
        RoundSpeedDials,
        ResultsDialog,
        GameEndDialog,
        SettingsDialog,
        ResumeDialog,
    },
})
export default class Board extends Vue {
    @Get(gameModule) private gameStatus!: GameStatusType;

    @Sync(boardModule) private showBetSnackbar!: boolean;

    @Get(boardModule) private gameBoardBox!: BoardBoxType[];

    @Sync(boardModule) private showFiguresSnackbar!: boolean;

    @Get(boardModule) private boardStatus!: BoardStatusType;

    beforeMount() {
        if (this.gameStatus !== GameStatusType.gameStarted) {
            this.$router.push({ name: 'game' });
        }
    }

    get figuresSetup() {
        return this.boardStatus === BoardStatusType.figuresSetup;
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>
