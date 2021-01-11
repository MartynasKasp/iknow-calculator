import {
    Module, VuexModule, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import { AutoMutations } from '@/utils/vuex-module-mutators';
import store from '@/store';
import { PlayerType, SelectType } from '@/store/types';
import { FormErrorType } from '@/utils/errors/types';
import { PlayerFormDataType } from './types';
import { defaultFormData } from './defaults';

const MAX_PLAYERS = 6;

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

    private players: PlayerType[] = [];

    private formData: PlayerFormDataType = defaultFormData();

    private formErrors: FormErrorType[] = [];

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

    private showSnackbar: boolean = false;

    private disableAddButton: boolean = false;

    @Mutation
    private addPlayer(data: PlayerType) {
        this.players.push(data);
    }

    @Mutation
    private removePlayer(index: number) {
        this.players.splice(index, 1);
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
    private toggleSnackbar() {
        this.showSnackbar = !this.showSnackbar;
    }

    @Mutation
    private toggleAddButton() {
        this.disableAddButton = !this.disableAddButton;
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
            this.toggleAddButton();
            this.toggleSnackbar();
            throw new Error('Maximum players count is 6 persons.');
        }
    }

    @Action
    public removePlayerFromGame(index: number) {
        this.removePlayer(index);
        this.toggleAddButton();
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
}

export default getModule(Game);
