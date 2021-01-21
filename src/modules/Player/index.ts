import {
    Module, VuexModule, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import { AutoMutations } from '@/utils/vuex-module-mutators';
import store from '@/store';
import { BoardBoxType, PlayerType } from '@/store/types';
import { MAX_PLAYERS } from '@/modules/Game';
import { FormErrorType } from '@/utils/errors/types';
import { defaultFormData } from './defaults';
import { PlayerFormDataType } from './types';
import { POINTS_BET, POINTS_READING, POINTS_WINNER } from '../Game/defaults';

@Module({
    namespaced: true, dynamic: true, store, name: 'player',
})
@AutoMutations
export class Player extends VuexModule {
    private players: PlayerType[] = [];

    private showMaxSnackbar: boolean = false;

    private showMinSnackbar: boolean = false;

    private disableAddButton: boolean = false;

    private showSetupCompleteDialog: boolean = false;

    private formData: PlayerFormDataType = defaultFormData();

    private formErrors: FormErrorType[] = [];

    private readerIndex: number = 0;

    private categoryPicker: number = -1;

    private knowFigures: PlayerType[] = [];

    private betFigures: PlayerType[] = [];

    @Mutation
    private addPlayer(data: PlayerType) {
        this.players.push(data);
    }

    @Mutation
    private removePlayer(index: number) {
        this.players.splice(index, 1);
    }

    @Mutation
    private setPlayersData(data: PlayerType[] = []) {
        this.players = [...data];
    }

    @Mutation
    private toggleMaxSnackbar() {
        this.showMaxSnackbar = !this.showMaxSnackbar;
    }

    @Mutation
    public toggleMinSnackbar() {
        this.showMinSnackbar = !this.showMinSnackbar;
    }

    @Mutation
    private setAddButtonDisabled(value: boolean) {
        this.disableAddButton = value;
    }

    @Mutation
    public toggleSetupCompleteDialog() {
        this.showSetupCompleteDialog = !this.showSetupCompleteDialog;
    }

    @Mutation
    public setSetupCompleteDialog(status: boolean) {
        this.showSetupCompleteDialog = status;
    }

    @Mutation
    private addFormError(payload: { key: string; value: string }) {
        this.formErrors[payload.key] = payload.value;
    }

    @Mutation
    public clearFormErrors() {
        this.formErrors = [];
    }

    @Mutation
    private clearFormData() {
        this.formData = defaultFormData();
    }

    @Mutation
    private increaseReaderIndex() {
        this.readerIndex += 1;
    }

    @Mutation
    private resetReaderIndex() {
        this.readerIndex = 0;
    }

    @Mutation
    private setReaderIndex(index: number) {
        this.readerIndex = index;
    }

    @Mutation
    private setKnowFigures(data: PlayerType[]) {
        this.knowFigures = [...data];
    }

    @Mutation
    private setBetFigures(data: PlayerType[]) {
        this.betFigures = [...data];
    }

    @Mutation
    private setCategoryPicker(index: number) {
        this.categoryPicker = index;
    }

    @Action
    public async restartGame() {
        const winner = this.players.find((player) => player.points >= POINTS_WINNER);
        let winnerIndex = 0;
        if (winner) {
            winnerIndex = this.players.indexOf(winner);
        }
        this.setPlayersData(
            this.players
                .map((player) => ({ ...player, points: 1, roundResult: 0 })),
        );
        this.setReaderIndex(winnerIndex);
        this.setFigures();
        this.setCategoryPicker(winnerIndex);
    }

    @Action
    public getNextReader() {
        if (this.readerIndex + 1 === this.players.length) {
            this.resetReaderIndex();
        } else {
            this.increaseReaderIndex();
        }
    }

    @Action({ rawError: true })
    public async addPlayerToGame() {
        if (this.players.length < MAX_PLAYERS) {
            // eslint-disable-next-line no-useless-catch
            try {
                await this.validateForm();

                const { name, color } = this.formData;
                this.addPlayer({
                    name, color, points: 1, roundResult: 0,
                });
                this.clearFormData();
            } catch (e) {
                throw e;
            }
        } else {
            this.setAddButtonDisabled(true);
            this.toggleMaxSnackbar();
            throw new Error('Maximum players count is 6 persons.');
        }
    }

    @Action
    public removePlayerFromGame(index: number) {
        this.removePlayer(index);
        this.setAddButtonDisabled(false);
    }

    @Action({ rawError: true })
    private async validateForm() {
        this.clearFormErrors();

        const { name, color } = this.formData;
        if (name === '') {
            this.addFormError({ key: 'name', value: 'Enter player name' });
        }
        if (color === '') {
            this.addFormError({ key: 'color', value: 'Select player color' });
        }

        if (Object.keys(this.formErrors).length !== 0) {
            throw new Error('Form not valid');
        }
    }

    @Action
    public completePlayerSetup() {
        this.resetReaderIndex();
        this.setFigures();
        this.setCategoryPicker(0);
    }

    @Action
    public setFigures() {
        const playersBefore = this.players.slice(0, this.readerIndex);
        const playersAfter = this.players.slice(this.readerIndex + 1);

        this.setKnowFigures([...playersAfter, ...playersBefore]);
        this.setBetFigures([...playersAfter, ...playersBefore]);
    }

    @Action
    public async startNextRound() {
        this.resetRoundResults();
        this.getNextReader();
        this.setFigures();
        if (this.categoryPicker === -1) {
            this.setCategoryPicker(this.readerIndex);
        }
    }

    @Action
    private resetRoundResults() {
        const resetResult = this.players.map((player) => ({ ...player, roundResult: 0 }));
        this.setPlayersData(resetResult);
    }

    @Action
    public async calculatePoints(board: BoardBoxType[]) {
        this.setCategoryPicker(-1);
        await this.calculateRoundResult(board);
        this.addRoundPoints();
    }

    @Action
    public async calculateRoundResult(board: BoardBoxType[]) {
        this.players[this.readerIndex].roundResult = POINTS_READING;

        board.forEach((row) => {
            if (row.playerKnowFigure && row.knowAnswer) {
                const player = this.players
                    .find((p) => p.color === row.playerKnowFigure?.color);

                if (player) {
                    if (this.categoryPicker === -1) {
                        this.setCategoryPicker(this.players.indexOf(player));
                    }

                    player.roundResult += row.points;
                }
            }
        });

        board.forEach((row) => {
            if (row.playerKnowFigure) {
                if (row.playerBetFigure.positive) {
                    const { color } = row.playerBetFigure.positive;
                    const player = this.players
                        .find((p) => p.color === color);

                    if (player) {
                        if (row.knowAnswer) {
                            player.roundResult += POINTS_BET;
                        } else {
                            player.roundResult -= POINTS_BET;
                        }
                    }
                }

                if (row.playerBetFigure.negative) {
                    const { color } = row.playerBetFigure.negative;
                    const player = this.players
                        .find((p) => p.color === color);

                    if (player) {
                        if (!row.knowAnswer) {
                            player.roundResult += POINTS_BET;
                        } else {
                            player.roundResult -= POINTS_BET;
                        }
                    }
                }
            }
        });
    }

    @Action
    public addRoundPoints() {
        const result = this.players.map((player) => ({
            ...player,
            points: player.points + player.roundResult,
        }));
        this.setPlayersData(result);
    }

    @Action
    public async isGameOver(): Promise<boolean> {
        const winner = this.players
            .find((player) => player.points >= POINTS_WINNER);

        if (winner) {
            return true;
        }

        return false;
    }

    @Action
    public clearGame() {
        this.setPlayersData();
        this.setSetupCompleteDialog(false);
    }
}

export default getModule(Player);
