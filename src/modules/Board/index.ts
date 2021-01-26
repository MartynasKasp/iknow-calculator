import {
    Module, VuexModule, getModule, Mutation, Action,
} from 'vuex-module-decorators';
import { AutoMutations } from '@/utils/vuex-module-mutators';
import store from '@/store';
import { BoardBoxType } from '@/store/types';
import { defaultGameBoardBox } from './defaults';

export enum BoardStatusType {
    figuresSetup,
    answersCheck,
    pointsCalculation
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
    public toggleFiguresSnackbar() {
        this.showFiguresSnackbar = !this.showFiguresSnackbar;
    }

    @Mutation
    public setGameEndDialog(status: boolean) {
        this.showGameEndDialog = status;
    }

    @Action
    public startNextRound() {
        this.setBoardStatus(BoardStatusType.figuresSetup);
        this.resetGameBoard();
        this.toggleResultsDialog();
    }

    @Action
    public async restartGame() {
        this.setBoardStatus(BoardStatusType.figuresSetup);
        this.resetGameBoard();
    }
}

export default getModule(Board);
