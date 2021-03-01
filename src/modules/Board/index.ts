import {
    Module, VuexModule, getModule, Mutation, Action,
} from 'vuex-module-decorators';
import { AutoMutations } from '@/utils/vuex-module-mutators';
import store from '@/store';
import { BoardBoxType } from '@/store/types';
import { defaultGameBoardBox } from './defaults';

export enum BoardStatusType {
    figuresSetup,
    answersCheck
}

@Module({
    namespaced: true, dynamic: true, store, name: 'board',
})
@AutoMutations
export class Board extends VuexModule {
    private boardStatus: BoardStatusType = BoardStatusType.figuresSetup;

    private showBetSnackbar: boolean = false;

    private gameBoardBox: BoardBoxType[] = defaultGameBoardBox();

    private showCalculationResultDialog: boolean = false;

    private showFiguresSnackbar: boolean = false;

    private showGameEndDialog: boolean = false;

    private showSettingsDialog: boolean = false;

    @Mutation
    public setBoardStatus(status: BoardStatusType) {
        this.boardStatus = status;
    }

    @Mutation
    public toggleResultsDialog() {
        this.showCalculationResultDialog = !this.showCalculationResultDialog;
    }

    @Mutation
    public toggleBetSnackbar() {
        this.showBetSnackbar = !this.showBetSnackbar;
    }

    @Mutation
    private resetGameBoard() {
        this.gameBoardBox = defaultGameBoardBox();
    }

    @Mutation
    private clearBoardAnswers() {
        const resetBox = this.gameBoardBox.map((item) => ({
            ...item,
            knowAnswer: false,
        }));

        this.gameBoardBox = [...resetBox];
    }

    @Mutation
    public toggleFiguresSnackbar() {
        this.showFiguresSnackbar = !this.showFiguresSnackbar;
    }

    @Mutation
    public setGameEndDialog(status: boolean) {
        this.showGameEndDialog = status;
    }

    @Action
    public startNextRound() {
        this.resetGameBoard();
        this.toggleResultsDialog();
        this.setBoardStatus(BoardStatusType.figuresSetup);
    }

    @Action
    public async restartGame() {
        this.resetGameBoard();
        this.setBoardStatus(BoardStatusType.figuresSetup);
    }

    @Action
    public backToFiguresSetup() {
        this.clearBoardAnswers();
        this.setBoardStatus(BoardStatusType.figuresSetup);
    }
}

export default getModule(Board);
