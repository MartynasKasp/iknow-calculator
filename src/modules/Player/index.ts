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

export const POINTS_READING = 2;
export const POINTS_BET = 1;

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
    private setKnowFigures(data: PlayerType[]) {
        this.knowFigures = [...data];
    }

    @Mutation
    private setBetFigures(data: PlayerType[]) {
        this.betFigures = [...data];
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
                this.addPlayer({ name, color, points: 1 });
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
    }

    @Action
    public setFigures() {
        const playersFigures: PlayerType[] = this.players
            .filter((player, index) => index !== this.readerIndex);

        this.setKnowFigures(playersFigures);
        this.setBetFigures(playersFigures);
    }

    @Action
    public startNextRound(results: PlayerType[]) {
        this.addRoundPoints(results);
        this.getNextReader();
        this.setFigures();
    }

    @Action
    public async calculatePoints(board: BoardBoxType[]): Promise<PlayerType[]> {
        const results: PlayerType[] = [];
        results.push({
            name: this.players[this.readerIndex].name,
            color: this.players[this.readerIndex].color,
            points: POINTS_READING,
        });

        board.forEach((row) => {
            if (row.playerKnowFigure && row.knowAnswer) {
                results.push({
                    name: row.playerKnowFigure.name,
                    color: row.playerKnowFigure.color,
                    points: row.points,
                });
            }
        });

        board.forEach((row) => {
            if (row.playerKnowFigure) {
                if (row.playerBetFigure.positive) {
                    let gotPoints: number = 0;
                    if (row.knowAnswer) {
                        gotPoints += POINTS_BET;
                    } else {
                        gotPoints -= POINTS_BET;
                    }
                    const { color, name } = row.playerBetFigure.positive;
                    const player = results.map((i) => i.color)
                        .indexOf(color);

                    if (player !== -1) {
                        results[player].points += gotPoints;
                    } else {
                        results.push({
                            name,
                            color,
                            points: gotPoints,
                        });
                    }
                }

                if (row.playerBetFigure.negative) {
                    let points: number = 0;
                    if (!row.knowAnswer) {
                        points += POINTS_BET;
                    } else {
                        points -= POINTS_BET;
                    }

                    const { color, name } = row.playerBetFigure.negative;
                    const player = results.map((i) => i.color)
                        .indexOf(color);

                    if (player !== -1) {
                        results[player].points += points;
                    } else {
                        results.push({
                            name,
                            color,
                            points,
                        });
                    }
                }
            }
        });
        return results;
    }

    @Action
    public addRoundPoints(results: PlayerType[]) {
        results.forEach((result) => {
            const player = this.players.find((p) => p.color === result.color);
            if (player) {
                player.points += result.points;
            }
        });
    }
}

export default getModule(Player);
