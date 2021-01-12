import {
    Module, VuexModule, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import { AutoMutations } from '@/utils/vuex-module-mutators';
import store from '@/store';
import { PlayerType } from '@/store/types';
import { MAX_PLAYERS } from '@/modules/Game';
import { FormErrorType } from '@/utils/errors/types';
import { defaultFormData } from './defaults';
import { PlayerFormDataType } from './types';

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
        this.knowFigures = data;
    }

    @Mutation
    private setBetFigures(data: PlayerType[]) {
        this.betFigures = data;
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
                this.addPlayer({ name, color, points: 0 });
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
    public startNextRound() {
        this.getNextReader();
        this.setFigures();
    }
}

export default getModule(Player);
