import {
    Module, VuexModule, getModule, Mutation, Action,
} from 'vuex-module-decorators';
import { AutoMutations } from '@/utils/vuex-module-mutators';
import store from '@/store';
import { BoardBoxType, PlayerType } from '@/store/types';
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

    private roundResults: PlayerType[] = [];

    private showFiguresSnackbar: boolean = false;

    @Mutation
    public setBoardStatus(status: BoardStatusType) {
        this.boardStatus = status;
    }

    @Mutation
    public toggleResultsDialog() {
        this.showCalculationResultDialog = !this.showCalculationResultDialog;
    }

    @Mutation
    public setRoundResults(data: PlayerType[]) {
        this.roundResults = data;
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

    @Action
    public startNextRound() {
        this.setBoardStatus(BoardStatusType.figuresSetup);
        this.resetGameBoard();
        this.toggleResultsDialog();
    }
}

export default getModule(Board);
