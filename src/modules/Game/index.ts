import {
    Module, VuexModule, getModule, Mutation,
} from 'vuex-module-decorators';
import { AutoMutations } from '@/utils/vuex-module-mutators';
import store from '@/store';
import { SelectType } from '@/store/types';

export const MAX_PLAYERS = 6;
export enum GameStatusType {
    playersSetup,
    gameStarted,
    gameEnd,
}

@Module({
    namespaced: true, dynamic: true, store, name: 'game',
})
@AutoMutations
export class Game extends VuexModule {
    private gameStatus: GameStatusType = GameStatusType.playersSetup;

    private figureColors: SelectType[] = [
        {
            value: '0e6cb9',
            name: 'Blue',
        },
        {
            value: 'f6a146',
            name: 'Orange',
        },
        {
            value: 'e84a50',
            name: 'Red',
        },

        {
            value: '45a199',
            name: 'Green',
        },
        {
            value: 'feed34',
            name: 'Yellow',
        },
        {
            value: '6d489d',
            name: 'Purple',
        },
    ];

    private resumingGame: boolean = false;

    private showBugReportDialog: boolean = false;

    @Mutation
    public setGameStatus(status: GameStatusType) {
        this.gameStatus = status;
    }

    @Mutation
    public setResumingGame(val: boolean) {
        this.resumingGame = val;
    }

    @Mutation
    public setBugReportDialog(val: boolean) {
        this.showBugReportDialog = val;
    }
}

export default getModule(Game);
